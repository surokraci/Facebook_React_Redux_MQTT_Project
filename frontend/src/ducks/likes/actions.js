import types from './types';

export const LikesListRequestAction = (posts) => ({
    type: types.LIKES_LIST,
    payload: posts
})

export const LikesListRequestStartAction = ({
    type: types.LIKES_LIST_REQUEST_START
});

export const LikesListRequestFailAction = (error) => ({
    type: types.LIKES_LIST_REQUEST_FAIL,
    payload: error
})


export const LikesAdd = (post) => ({
    type: types.LIKES_PLUS,
    payload: post
})

export const LikesRemove = (post) => ({
    type: types.LIKES_MINUS,
    payload: post
})