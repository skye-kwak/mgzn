import React from 'react';
//-- style --//
import './App.css';
import styled from "styled-components";
//-- components --//
import { Grid, Button, Spinner } from '../elements';
import Permit from './Permit';
//-- route --//
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from '../redux/configStore';
//-- pages --//
import { UserSignup, UserLogin, PostList, PostWrite, PostDetail, NotFound, MyPage } from "../pages";
import Header from '../components/Header';
//-- redux --//
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"
//-- user auth --//
import { apiKey } from "./firebase";

function App() {
  // 로그인 상태 유지
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.checkLoggedInFB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* {is_loading ? (<Spinner />) : */}
        <Container>
          <Grid> 
            <ConnectedRouter history={history}> 
              <Header />
              <Switch>
                <Route exact path="/" component={PostList} />
                <Route exact path="/mypage" component={MyPage} />
                <Route exact path="/write" component={PostWrite} />
                <Route exact path="/write/:id" component={PostWrite} />
                <Route exact path="/post/:id" component={PostDetail} />
                <Route exact path="/signup" component={UserSignup} />
                <Route exact path="/login" component={UserLogin} />
                <Route component={NotFound} />
              </Switch>
            </ConnectedRouter>
          </Grid>
          <Permit>
            <Button 
              is_float
              text="+"
              _onClick={() => {history.push("/write")}} />
          </Permit>
        </Container>
      {/* }         */}
    </React.Fragment>
  );
}

export default App;

const Container = styled.div`
	max-width: 600px;
  min-width: 380px;
	min-height: 100vh;
  /* padding: 0px 5px; */
	margin: 0px auto;
  box-shadow: 0px 10px 30px 0px #aaa;
`;