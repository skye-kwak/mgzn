import { createAction, handleActions } from "redux-actions";
import produce from "immer";
// firebase storage
import { storage } from "../../shared/firebase";

// init actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// create actions
const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

// initialState
const initialState = {
		image_url: 'https://firebasestorage.googleapis.com/v0/b/react-assignment-27df2.appspot.com/o/images%2Fyana_hurskaya-HpQFPnCK7_A-unsplash.jpg?alt=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6',
		uploading: false,
		preview: null,
}

// middleware actions - upload image
const uploadImageFB = (image) => {
	return function(dispatch, getState, { history }){
		//set uploading = true;
		dispatch(uploading(true));
		// Upload 모듈에 있던 거 가지고 와서 업로드!
		const _upload = storage.ref(`images/${image.name}`).put(image);
		_upload.then((snapshot) => {
			snapshot.ref.getDownloadURL().then((url) => {
				//가져온 url을 uploadImage에 넣기
				dispatch(uploadImage(url));
				});
			});

	}
}

// reducers
export default handleActions({
		[UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
				draft.image_url = action.payload.image_url;
				//uploading = false 바꿔주기
				draft.uploading = false;
		}),
		[UPLOADING]: (state, action) => produce(state, (draft) => {
				draft.uploading = action.payload.uploading;
		}),
		[SET_PREVIEW]: (state, action) => produce(state, (draft) => {
			draft.preview = action.payload.preview;
		})
}, initialState);

// action creator export
const actionCreators = {
	uploadImage,
	uploadImageFB,
	setPreview,
};
export {actionCreators};

