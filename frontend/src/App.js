import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useEffect } from "react";
import { getPostsList } from './ducks/posts/operations'
import Postlist from './ui/wall/postlist';
import { connect } from "react-redux";
import LoginForm from './ui/login/loginpage';
import { getUsersList} from './ducks/users/operations'
import { useCookies } from 'react-cookie';
import {loginUser} from './ducks/users/operations'
import { withRouter } from "react-router-dom";
import UserDetail from './ui/user/userProfile';
import UserEditForm from './ui/user/editProfile';
import {getCommentsList} from './ducks/comments/operations'
import { getLikesList } from './ducks/likes/operations';
import PostEditForm from './ui/posts/postEdit';
import ComEditForm from './ui/posts/comEdit';




function App({getPostsList, getUsersList, loginUser, getCommentsList, getLikesList}) {

  const [cookies, setCookie] = useCookies(['user']);
  useEffect(() => {
    cookies.login && loginUser({
      login: cookies.login,
      password: cookies.password
    })
    getPostsList()
    getUsersList()
    getCommentsList()
    getLikesList()
    
    
    
    
  });
 
  
  
  return (
    <div>
      <Router>
      <div >
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/comments/:id/edit">
            <ComEditForm/>
          </Route>
        <Route path="/posts/:id/edit">
            <PostEditForm/>
          </Route>
        <Route path="/users/:login/edit">
            <UserEditForm/>
          </Route>
        <Route path="/users/:login">
            <UserDetail/>
          </Route>
          <Route path="/login">
            <LoginForm/>
          </Route>
          <Route path="/">
            <Postlist/>
          </Route>
        </Switch>
      </div>
    </Router>

    </div>
  );
}


const mapDispatchToProps = {
  getPostsList,
  getUsersList,
  loginUser,
  getCommentsList,
  getLikesList
  
}

export default connect(null, mapDispatchToProps)(App);

