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




function App({getPostsList, getUsersList}) {
  useEffect(() => {
    getPostsList()
    getUsersList()
    
    
  }, []);
  
  
  return (
    <div>
      <Router>
      <div >
        <nav className='sidebar'>
          <ul>
            <li>
              <Link to="/">Wall</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
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
  getUsersList
}

export default connect(null, mapDispatchToProps)(App);

