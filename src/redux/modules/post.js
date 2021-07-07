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
	id: null,
	user_info: { 
		user_email: "user@email.com",
		user_name: "user_name",
		user_profile: "https://firebasestorage.googleapis.com/v0/b/react-…=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
	},
	image_url: "https://firebasestorage.googleapis.com/v0/b/react-…=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
	contents: "",
	like_cnt: 0,
	layout_type: "a",
	insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// reducers
export default handleActions(
	{
		[SET_POST]: (state, action) =>
			produce(state, (draft) => {
		
		}),

		[CREATE_POST]: (state, action) =>
			produce(state, (draft) => {

		}),
	},
	initialState
);

const actionCreators = {
	setPost,
	createPost,
	// editPost,
	// getPostFB,
	// addPostFB,
	// editPostFB,
	// getOnePostFB,
	// deletePostFB,
};

export { actionCreators };
