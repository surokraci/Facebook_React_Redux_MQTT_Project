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




function App({getPostsList, getUsersList, loginUser}) {

  const [cookies, setCookie] = useCookies(['user']);
  useEffect(() => {
    cookies.login && loginUser({
      login: cookies.login,
      password: cookies.password
    })
    getPostsList()
    getUsersList()
    
    
    
    
  });
 
  
  
  return (
    <div>
      <Router>
      <div >
        <nav className='sidebar'>
          <ul>
            <li>
              <Link to="/wall">Wall</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginForm/>
          </Route>
          <Route path="/wall">
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
  loginUser
}

export default connect(null, mapDispatchToProps)(App);

