import types from './types';

const initState = {
    posts: [],
    loading: false,
    error: ''
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case types.POST_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case types.POST_LIST_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case types.POST_LIST:
            return {...state, posts: [...action.payload], loading: false };
        case types.POST_CREATE:
            return {...state, posts: [...state.posts, action.payload]}
        case types.POST_DELETE:
            return {...state, posts: state.posts.filter(el=>el._id !== action.payload)}
        case types.POST_EDIT:
            console.log(action.payload);
            return {state, posts: state.posts.map(function(item){return item._id === action.payload._id ? {...item, text: action.payload.text, photoUrl: action.payload.photoUrl}:{...item}})}
        default:
            return state;
    }
}

export default PostReducer;