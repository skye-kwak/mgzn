import React from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configStore";
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "../shared/firebase";

const Header = (props) => {
  //redux hooks, is_loggedIn 보기 위해서 useSelector 사용
  const dispatch = useDispatch();
  const is_loggedIn = useSelector((state) => state.user.is_loggedIn)
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // session check
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  if (is_loggedIn && is_session) {
    return (
      <React.Fragment>
        <Grid is_flex padding="10px 16px 30px">
          <Grid>
            <Text 
              type="logo" 
              margin="0px" 
              size="36px" bold
              _onClick={() => {history.push("/")}}>
              MGZN
            </Text>
          </Grid>
  
          <Grid is_flex>
            <Button					
              type="menu"
              text="MY PAGE"
              _onClick={() => {history.push("/mypage");}}
            ></Button>
            <Button				
              type="menu"
              text="LOG OUT"
              _onClick={() => {
                dispatch(userActions.logoutFB({}));
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
	return (
    <React.Fragment>
      <Grid is_flex padding="10px 16px 30px">
        <Grid>
          <Text 
            type="logo" 
            margin="0px" 
            size="36px" bold
            _onClick={() => {history.push("/")}}>
            MGZN
          </Text>
        </Grid>

        <Grid is_flex>
          <Button					
						type="menu"
            text="LOG IN"
            _onClick={() => {history.push("/login");}}
          ></Button>
          <Button				
						type="menu"
            text="SIGN UP"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
	);
}
Header.defaultProps = {}

export default Header;