import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import firebase, firestore & storage config
import { firestore, storage } from "../../shared/firebase";
import firebase from "firebase/app";
// insert dt
import moment from "moment";

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
	// 	user_profile: "https://firebasestorage.googleapis.com/v0/b/react-…=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
	// },
	image_url: "https://firebasestorage.googleapis.com/v0/b/react-…=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
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

		postDB.add({...user_info, ..._post}).then((doc) => {
			// db에 id 추가하기
			// 포스트는 단일 도큐먼트로 db에 들어가게 됨
			let post = {user_info, ..._post, id: doc.id};
			//리덕스에 넣기
			dispatch(createPost(post));
			history.replace("/");

	}).catch((err) => {
			window.alert("post 작성에 실패했습니다.");
			console.log("post 작성에 실패했습니다.", err);
	});

	};
};


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
	},
	initialState
);

const actionCreators = {
	setPost,
	createPost,	
	getPostFB,
	createPostFB,
	// editPost,	
	// editPostFB,
	// getOnePostFB,
	// deletePostFB,
};

export { actionCreators };
