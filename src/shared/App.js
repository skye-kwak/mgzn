import React from 'react';
//-- style --//
import './App.css';
//-- route --//
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from '../redux/configStore';
//-- pages --//
import { UserSignup, UserLogin, PostList, PostWrite, PostDetail, NotFound, MyPage } from "../page/IndexOfPages";
import Header from '../component/Header';


function App() {
  return (
    <React.Fragment>
      <Header />
      <ConnectedRouter history={history}> 
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
    </React.Fragment>
    
  );
}

export default App;
