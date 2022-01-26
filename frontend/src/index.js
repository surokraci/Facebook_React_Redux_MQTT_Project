import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import PostReducer from './ducks/posts/reducers';
import UserReducer from './ducks/users/reducers';
import { CookiesProvider } from "react-cookie";
import CommentReducer from './ducks/comments/reducers';
import LikesReducer from './ducks/likes/reducers';

const store = createStore(
  combineReducers({
    posts: PostReducer,
    users: UserReducer,
    comments: CommentReducer,
    likes: LikesReducer
  }), applyMiddleware(thunk)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Suspense fallback={<div>Ładowanie...</div>}>
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
