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
        default:
            return state;
    }
}

export default UserReducer;