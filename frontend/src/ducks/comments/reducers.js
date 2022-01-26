import types from './types';

const initState = {
    comments: [],
    loading: false,
    error: ''
}

const CommentReducer = (state = initState, action) => {
    switch(action.type) {
        case types.COMMENTS_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case types.COMMENTS_LIST_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case types.COMMENTS_LIST:
            return {...state, comments: [...action.payload], loading: false };
        case types.COMMENTS_CREATE:
            return {...state, comments: [...state.comments, action.payload]}
        case types.COMMENTS_DELETE:
            return {...state, comments: state.comments.filter(el=>el._id !== action.payload)}
        case types.COMMENT_EDIT:
            console.log(action.payload);
            return {state, comments: state.comments.map(function(item){return item._id === action.payload._id ? {...item, text: action.payload.text}:{...item}})}            
        default:
            return state;
    }
}

export default CommentReducer;