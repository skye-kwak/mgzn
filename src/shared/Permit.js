import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  // 유저 정보 유무
  const user_info = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 유무
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (user_info && is_session) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  
  return null;
};

export default Permit;
