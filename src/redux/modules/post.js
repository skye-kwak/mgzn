import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import firebase, firestore & storage config
import { firestore, storage } from "../../shared/firebase";
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
const LIKE_TOGGLE = "LIKE_TOGGLE";

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
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_liked = null) => ({
	post_id,
	is_liked,
}));


// initialState ; 
// postlist [], 무한스크롤 페이징 위한 페이징 정보, 현재 로딩중인지 여부
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
	is_liked: false,
	insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// middleware - 게시글 가져오기
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
		// for infinite scroll
		// 페이징 정보 최우선, 시작정보 있는데 다음 정보 없을 때 == 리스트 끝, return;
		let _paging = getState().post.paging;
		if (_paging.start && !_paging.next) {
      return;
    }
		dispatch(loading(true));

		// DB info / query
    const postDB = firestore.collection("mgzn_post");
		let query = postDB.orderBy("insert_dt", "desc").limit(3);
		
		//시작점 있을 때; startAt ; limit()의 경우 시작점 다음부터 나와야함
    if(start){
      query = query.startAt(start);
    }
		// limit 3으로 끊어 보여 줄 때, 4를 가져온다.
		// 4만큼 오면 ; 다음 페이지 있음, 4 미만이면 ; 다음 페이지 없음
    query.limit(size + 1).get().then((docs) => {
      let post_list = [];
			// paging; db docs start/next. next항목; 다음 호출시 start param
			let paging = {
        start: docs.docs[0],
        next: docs.docs.length === (size+1)? docs.docs[docs.docs.length - 1] : null,
        size: size,
      };

      docs.forEach((doc) => {
        let _post = doc.data();

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
				//post를 post_list(initialState; [])에 넣어주기
        post_list.push(post);
      });
			// 가지고 오는 데이터 마지막 하나는 뺄 것;
      // 다음 페이지 유무? 다음 페이지로 들어감 : 다음페이지 없음
      post_list.pop();
			// 리덕스에 넣어주기 + 무한 스크롤 시 페이징 정보도 같이 setPost
			if (getState().user.user){
				dispatch(setIsLiked(post_list, paging));
			}else{
				dispatch(setPost(post_list, paging));
			}
    });
  };
};
// middleware - 게시글 하나만 가져오기
// 상세페이지 
const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("mgzn_post");
    postDB.doc(id).get()
      .then((doc) => {
				
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
				// 글 하나지만 배열 속에 있어야 함, 주의;
        dispatch(setIsLiked([post]));
      });
  };
};
// middleware - 게시글 저장하기
const createPostFB = (contents = "", layout_type ="a") => {
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
			layout_type: layout_type,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
		//프리뷰에 띄운 이미지 가져오기
		const _image = getState().image.preview;
		// console.log(_image);
    // console.log(typeof _image);
		if(!_image){
			window.alert('이미지 파일을 업로드해 주세요.');
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

// middleware - 좋아요 토글
const toggleLikeFB = (post_id) => {
	return function (dispatch, getState, { history }) {
		if (!getState().user.user) {
			return;
		}

		const postDB = firestore.collection("mgzn_post");
		const likeDB = firestore.collection("mgzn_like");

		// 가져온 post id 배열 내 인덱스 찾아서 정보 가지고 오고, 현재 로그인한 user id 가져오기
		const _index = getState().post.list.findIndex((post) => post.id === post_id);
		const _post = getState().post.list[_index];
		const user_id = getState().user.user.uid;

		// 좋아요한 상태라면 해제하기
		// likeDB에서 데이터 지우고 postDB에서 likes_count -1
		if (_post.is_liked) {
			likeDB
				.where("post_id", "==", _post.id)
				.where("user_id", "==", user_id)
				.get()
				.then((docs) => {
					let batch = firestore.batch();
					docs.forEach((doc) => {
						batch.delete(likeDB.doc(doc.id));
					});

					batch.update(postDB.doc(post_id), {
						likes_count:
							_post.likes_count - 1 < 1 ? _post.likes_count : _post.likes_count - 1,
					});

					batch.commit().then(() => {
						dispatch(likeToggle(post_id, !_post.is_liked));
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// 좋아요 해제 상태라면 좋아요 하기
			// likeDB에 해당 데이터 넣고 postDB에서 likes_count +1
			likeDB.add({ post_id: post_id, user_id: user_id }).then(doc => {
				postDB.doc(post_id).update({ likes_count: _post.likes_count + 1 }).then(doc => {
					// 이제 리덕스 데이터를 바꿔줘요!
					dispatch(likeToggle(post_id, !_post.is_liked));
				});
			});
		}
	};
};

// 좋아요 리스트를 가져와서 리덕스에 넣어주는 함수
const setIsLiked = (_post_list, paging) => {
	return function (dispatch, getState, { history }) {
		if (!getState().user.is_loggedIn) {
			return;
		}
		// 이제 좋아요 리스트를 가져올거예요 :)
		// 1. post_list에 들어있는 게시물의 좋아요 리스트를 가져오고,
		// 2. 지금 사용자가 좋아요를 했는 지 확인해서,
		// 3. post의 is_liked에 넣어줄거예요!
		const likeDB = firestore.collection("mgzn_like");
		// post_list의 id 배열을 만들어요
		const post_ids = _post_list.map((post) => post.id);

		// 저는 post_id를 기준으로 가져올거예요.
		let like_query = likeDB.where("post_id", "in", post_ids);
		like_query.get().then((like_docs) => {
			// 이제 가져온 like_docs에서 로그인한 유저가 좋아요했는 지 확인해볼까요?
			// 좋아요했는 지 확인한 후, post의 is_liked를 true로 바꿔주면 끝입니다! :)
			// 주의) 여기에서 데이터를 정제할건데, 여러 가지 방법으로 데이터를 정제할 수 있어요.
			// 지금은 우리한테 익숙한 방법으로 한 번 해보고, 나중에 다른 방법으로도 해보세요 :)
			// 파이어스토어에서 가져온 데이터를 {}로 만들어줄거예요.
			let like_list = {};
			like_docs.forEach((doc) => {
				// like_list에 post_id를 키로 쓰는 {}!
				// like_list[doc.data().post_id] :파이어스토어에서 가져온 데이터 하나 (=doc)의 data중 post_id를 키로 씁니다.
				// [ // <- 대괄호 열었다! 밸류는 배열로 할거예요!
				//   ...like_list[doc.data().post_id], // 해당 키에 밸류가 있다면, 그 밸류를 그대로 넣어주기
				//   doc.data().user_id, // user_id를 배열 안에 넣어줘요!
				// ]; <- 대괄호 닫기!
				// like_list에 post_id로 된 키가 있다면?
				// 있으면 배열에 기존 배열 + 새로운 user_id를 넣고,
				// 없으면 새 배열에 user_id를 넣어줍니다! :)
				if (like_list[doc.data().post_id]) {
					like_list[doc.data().post_id] = [
						...like_list[doc.data().post_id],
						doc.data().user_id,
					];
				} else {
					like_list[doc.data().post_id] = [doc.data().user_id];
				}
			});
			// 아래 주석을 풀고 콘솔로 확인해보세요!
			// console.log(like_list);
			// user_id 가져오기!
			const user_id = getState().user.user.uid;
			let post_list = _post_list.map((post) => {
				// 만약 p 게시글을 좋아요한 목록에 로그인한 사용자 id가 있다면?
				if (like_list[post.id] && like_list[post.id].indexOf(user_id) !== -1) {
					// is_liked만 true로 바꿔서 return 해줘요!
					return { ...post, is_liked: true };
				}
				return post;
			});
			dispatch(setPost(post_list, paging));
		});
	};
};
	
// reducers
export default handleActions(
	{
		[SET_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list.push(...action.payload.post_list);
				draft.paging = action.payload.paging;
				draft.is_loading = false;
				// // 기존 데이터 넣어주기, 
				// draft.list = draft.list.reduce((acc, cur) => {
				// 	if (acc.findIndex((a) => a.id === cur.id) === -1) {
				// 		return [...acc, cur];
				// 	} else {
				// 		acc[acc.findIndex((a) => a.id === cur.id)] = cur;
				// 		return acc;
				// 	}
				// }, []);

				// action.payload.paging? 넣어주기
				// if (action.payload.paging) {
				// draft.paging = action.payload.paging;
				// }
		}),
		[LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
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

		[LIKE_TOGGLE]: (state, action) =>
		produce(state, (draft) => {
			let _index = draft.list.findIndex((post) => post.id === action.payload.post_id);        
      draft.list[_index].is_liked = action.payload.is_liked;
		
		}),
	},
	initialState
);

const actionCreators = {
	setPost,
	createPost,	
	getPostFB,
	getOnePostFB,
	createPostFB,
	updatePostFB,		
	deletePostFB,
	toggleLikeFB,
};

export { actionCreators };
