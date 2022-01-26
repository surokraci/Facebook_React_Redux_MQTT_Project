import types from './types';

export const UserListRequestAction = (users) => ({
    type: types.USER_LIST,
    payload: users
})

export const UserListRequestStartAction = ({
    type: types.USER_LIST_REQUEST_START
});

export const UserListRequestFailAction = (error) => ({
    type: types.USER_LIST_REQUEST_FAIL,
    payload: error
})

export const UserCreateNew = (user) => ({
    type: types.USER_CREATE,
    payload: user
})

export const UserDeleteOne = (user) => ({
    type: types.USER_DELETE,
    payload: user
})

export const UserLogin = (user) => ({
    type: types.USER_LOGIN,
    payload: user
})

export const EditUser = (values) => ({
    type: types.USER_EDIT,
    payload: values
}) 