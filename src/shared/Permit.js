import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";
// memoization
const Permit = React.memo((props) => {
  // 유저 정보 유무
  const is_loggedIn = useSelector((state) => state.user.is_loggedIn);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 유무
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_loggedIn && is_session) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  
  return null;
});

export default Permit;