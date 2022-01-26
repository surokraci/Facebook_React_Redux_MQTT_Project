import types from './types';

const initState = {
    logged: {login: '', password: ''},
    users: [],
    loading: false,
    error: ''
}

const UserReducer = (state = initState, action) => {
    switch(action.type) {
        case types.USER_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case types.USER_LIST_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case types.USER_LIST:
            return {...state, users: [...action.payload], loading: false };
        case types.USER_CREATE:
            return {...state, users: [...state.users, action.payload]}
        case types.USER_LOGIN:
            return {state, logged: {login: action.payload.login, password: action.payload.password}}
        case types.USER_EDIT:
            return {state, users: state.users.map(function(item){return item._id === action.payload._id ? {...item, password: action.payload.password, firstName: action.payload.firstName, lastName: action.payload.lastName, gender: action.payload.gender, dateOfBirth: action.payload.dateOfBirth, profilePicture: action.payload.profilePicture}:{...item}})}
        case types.USER_DELETE:
            return {...state, users: state.users.filter(el=>el.login !== action.payload)}
        default:
            return state;
    }
}

export default UserReducer;