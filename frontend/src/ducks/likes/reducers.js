import types from './types';

const initState = {
    likes: [],
    loading: false,
    error: ''
}

const LikesReducer = (state = initState, action) => {
    switch(action.type) {
        case types.LIKES_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case types.LIKES_LIST_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case types.LIKES_LIST:
            return {...state, likes: [...action.payload], loading: false };
        case types.LIKES_CREATE:
            return {...state, likes: [...state.likes, action.payload]}
        case types.LIKES_PLUS:
            return {...state, likes: state.likes.map(function(item){return item._id === action.payload._id ? {...item, authors: [...item.authors, action.payload.author]}:{...item}})}
        case types.LIKES_MINUS:
            return {...state, likes: state.likes.map(function(item){return item._id === action.payload._id ? {...item, authors: item.authors.filter(el=>el !== action.payload.author)}:{...item}})}
            
        default:
            return state;
    }
}

export default LikesReducer;