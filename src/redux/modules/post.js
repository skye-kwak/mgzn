import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import firebase, firestore & storage config
import { firestore, storage } from "../../shared/firebase";
import firebase from "firebase/app";
// insert dt
import moment from "moment";
// imageActions for uploading image
import { actionCreators as imageActions } from "./image";

// init actions
const SET_POST = "SET_POST";
const CREATE_POST = "CREATE_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// create actions
const setPost = createAction(
	SET_POST, (post_list, paging) => ({ post_list, paging }));
const createPost = createAction(
	CREATE_POST, (post) => ({ post }));
const updatePost = createAction(
	UPDATE_POST, (post_id, post) => ({ post_id, post }));
const deletePost = createAction(
	DELETE_POST, (post_id) => ({post_id}));
const loading = createAction(
	LOADING, (is_loading) => ({is_loading}));


// initialState ; 
// postlist: [], 무한스크롤 페이징 위한 페이징 정보, 현재 로딩중인지 여부
const initialState = {
	list: [],
	paging: { start: null, next: null, size: 3 },
	is_loading: false,
};

// initial Post
// layout_type : a, b, c
//  - a : 텍스트가 위, 이미지가 아래인 레이아웃
//  - b : 텍스트가 좌측, 이미지가 우측인 레이아웃
//  - c : 텍스트가 우측, 이미지가 좌측인 레이아웃
const initialPost = {
	// id: null,
	// user_info: { 
	// 	user_id: "user_id",
	//  user_email: "user@email.com",
	// 	user_name: "user_name",
	// 	user_profile: "https://firebasestorage.googleapis.com/v0/b/react-assignment-27df2.appspot.com/o/images%2Fyana_hurskaya-HpQFPnCK7_A-unsplash.jpg?alt=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
	// },
	image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
	contents: "",
	likes_count: 0,
	layout_type: "a",
	insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// middleware - 게시글 가져오기
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
		// DB info
    const postDB = firestore.collection("mgzn_post");
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        // db에 저장된 데이터와 리덕스에 저장되는 데이터 모양 맞춰주기
        let _post = doc.data();
        let post = {
            id: doc.id,
            user_info: {
                user_name: _post.user_name,
                user_profile: _post.user_profile,
                user_id: _post.user_id,
								user_email: _post.user_email,
            },
            contents: _post.contents,
            image_url: _post.image_url,
            likes_count: _post.comment_cnt,
            insert_dt: _post.insert_dt,
						layout_type: _post.layout_type,
        }
				//post를 post_list(initialState; [])에 넣어주기
        post_list.push(post);
      });
      // 리스트 확인하기!
      console.log(post_list);
			// 리덕스에 넣어주기
      dispatch(setPost(post_list));
    });
  };
};

// middleware - 게시글 저장하기
const createPostFB = (contents = "") => {
	return function (dispatch, getState, { history }) {
		const postDB = firestore.collection("mgzn_post");
		//현재 로그인 한 작성자 정보 가져오기
		const _user = getState().user.user;
		//db에 저장할 사용자 정보
		const user_info ={
			user_name: _user.user_name,
			user_id: _user.uid,
			user_profile: _user.user_profile,
			user_email: _user.user_email,
		};
		//initialPost + 내용 및 시간 추가
		const _post = {
      ...initialPost,
      contents: contents,//param
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
		//프리뷰에 띄운 이미지 가져오기
		const _image = getState().image.preview;
		// console.log(_image);
    // console.log(typeof _image);
		if(!_image){
			window.alert('이미지가 필요해요!');
			return;
		}
		//파일 이름 유저 id, 현재 시간 밀리초로 넣어줌
		const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

		_upload.then((snapshot) => {
			snapshot.ref.getDownloadURL()
				.then((url) => {
					//console.log(url);
					return url;
				})
				.then((url) => {
					//이미지 업로드가 끝나고 나서 포스트를 올려줌, 게시글만 올라가지 않도록 - 흐름 이해하기
					postDB.add({...user_info, ..._post, image_url: url}).then((doc) => {
						// db에 id 추가하기
						// 포스트는 단일 도큐먼트로 db에 들어가게 됨
						let post = {user_info, ..._post, id: doc.id, image_url: url};
						//리덕스에 넣기
						dispatch(createPost(post));
						history.replace("/");
						//set preview null;
						dispatch(imageActions.setPreview(null));
				})
				.catch((err) => {
					window.alert("앗! 포스트 작성에 문제가 있어요!");
					console.log("post 작성에 실패했어요!", err);
				});
			})
			.catch((err) => {
				window.alert("앗! 이미지 업로드에 문제가 있어요!");
				console.log("앗! 이미지 업로드에 문제가 있어요!", err);
			});
		});
	};
};

// middleware - 게시글 수정하기
const updatePostFB = (post_id = null, post = {}) => {
	return function (dispatch, getState, { history }) {
    //들어오는 post id 값이 없을 때
		if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }
		const postDB = firestore.collection("mgzn_post");
		const _image = getState().image.preview;
		// 수정하려는 글 index로 게시글 가져오기
		const _post_index = getState().post.list.findIndex(
			(post) => (post.id === post_id));
		const _post = getState().post.list[_post_index];

		// 프리뷰와 게시글 정보에 있는 이미지 같은지 ? 업로드 안 함 : 함
    if (_image === _post.image_url) {
      // 게시글 정보만 수정
      postDB
        .doc(post_id).update(post)
        .then((doc) => {
          dispatch(updatePost(post_id, { ...post }));
          //set preview = null;
          dispatch(imageActions.setPreview(null));
          history.replace("/");
        });
      return;
    } else {
			// 글 작성 처럼 로그인한 유저 정보 가져와서
      const user_id = getState().user.user.uid;
      // 이미지를 data_url 방식으로 업로드
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
			// 글 신규작성처럼 이미지부터 업로드 후 url 가져오기
			_upload.then((snapshot) => {
				snapshot.ref
				.getDownloadURL()
				.then((url) => {
					return url;
				})
				.then((url) => {
					// id값에 해당하는 도큐먼트 수정/업데이트
					postDB
						.doc(post_id)
						.update({ ...post, image_url: url })
						.then((doc) => {
							// 리덕스에 수정한 정보 넣기
							dispatch(updatePost(post_id, { ...post, image_url: url }));
							// set preview = null;
							dispatch(imageActions.setPreview(null));
							history.replace("/");
						});
				})
				.catch((err) => {
					window.alert("이미지 업로드에 실패했습니다.");
					console.log("이미지 업로드에 실패했습니다.", err);
				});
			});
		}
	};
};	

// middleware - 게시글 삭제하기
const deletePostFB = (post_id = null) => {
	return function (dispatch, getState, { history }) {
    //들어오는 post id 값이 없을 때
		if (!post_id) {
      console.log("삭제할 수 없는 게시물입니다.");
      return;
    }
		const postDB = firestore.collection("mgzn_post");
		// post id 찾아서 삭제, 리덕스에서도 삭제, 메인으로 돌아가기
		postDB.doc(post_id).delete().then(res => {
			dispatch(deletePost(post_id));
			history.replace("/");
	}).catch((err) => {
		window.alert("게시글 삭제에 실패했습니다.");
		console.log("게시글 삭제에 실패했습니다.", err);
	})

	}
}

// reducers
export default handleActions(
	{
		[SET_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list.push(...action.payload.post_list); 
		}),

		[CREATE_POST]: (state, action) =>
			produce(state, (draft) => {
				//글 작성 후 배열의 맨 앞에다 데이터 넣어주기
				draft.list.unshift(action.payload.post);
		}),

		[UPDATE_POST]: (state, action) =>
			produce(state, (draft) => {
				// postlist index 찾아서 수정된 포스트를 해당 위치에 넣어주기
				let _index = draft.list.findIndex((post) => post.id === action.payload.post_id);
				draft.list[_index] = { ...draft.list[_index], ...action.payload.post };
		}),

		[DELETE_POST]: (state, action) => produce(state, (draft) => {
			let _index = draft.list.findIndex((post) => post.id === action.payload.post_id);
			if(_index !== -1){
				// index 위치의 post 삭제
				draft.list.splice(_index, 1);
			}
			
		}),
	},
	initialState
);

const actionCreators = {
	setPost,
	createPost,	
	getPostFB,
	createPostFB,
	updatePostFB,		
	// getOnePostFB,
	deletePostFB,
};

export { actionCreators };
