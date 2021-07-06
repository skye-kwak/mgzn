import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import auth for signup
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

// init actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";


// create actions
const logout = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
	user: null,
	is_loggedIn: false,
};

// middleware actions - signup; firebase auth
const signupFB = (id, pwd, user_name) => {
	return function (dispatch, getState, {history}) {
		auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
				auth.currentUser
          .updateProfile({
            displayName: user_name,
					})
					.then(() => {
						dispatch(
							setUser({
								user_name: user_name,
                user_email: id,
                user_profile: "",
                uid: user.user.uid,
							})
						);
						history.push("/");
					})
					.catch((error) => {
            console.log(error);
          });
			})
			.catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage); 
      });
	}
}
// middleware actions - login; firebase auth
const loginFB = (id, pwd) => {
	return function (dispatch, getState, { history }) {
		// 로그인 정보 auth session에 저장
		auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
			auth.signInWithEmailAndPassword(id, pwd)
        .then((user) => {
					// 리덕스에 로그인 정보 저장
					dispatch(
            setUser({
              user_name: user.user.displayName,
              user_email: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
					history.push("/");
				})
				.catch((error) => {
					window.alert("로그인에 실패하였습니다.");
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode, errorMessage);
        });
		});
	};
};
// middleware actions - 로그인 상태 유지하기
const checkLoggedInFB = () => {
  return function (dispatch, getState, { history }) {
		// firebase 로그인이 되어있다면? 유저 정보를 가져와서
    auth.onAuthStateChanged((user) => {
      // 리덕스에, 세션으로부터 가져온 유저 정보 저장
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            user_email: user.email,
            uid: user.uid,
          })
        );
      } else {
        // if not,firebase signout
        dispatch(logoutFB());
      }
    });
  };
};
// middleware actions - logout; firebase auth
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    // firebase signout then call logout()
    auth.signOut().then(() => {
			// dispatch; is_loggedIn = false
      dispatch(logout());
      history.replace("/");
    });
  };
};

// reducer
export default handleActions(
	{ 
		[LOG_OUT]: (state, action) =>
			produce(state, (draft) => {
				draft.user = null;
				draft.is_loggedIn = false;
			}),
		[GET_USER]: (state, action) => produce(state, (draft) => {}),
		[SET_USER]: (state, action) =>
			produce(state, (draft) => {
				draft.user = action.payload.user;
				draft.is_loggedIn = true;
			}),
	},
	initialState
);

// action creator export
const actionCreators = {
	signupFB,
	loginFB,
	logoutFB,
	checkLoggedInFB,
	logout,
	getUser,
};
export { actionCreators };