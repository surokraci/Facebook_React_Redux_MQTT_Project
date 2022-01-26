import types from './types';

export const PostListRequestAction = (posts) => ({
    type: types.POST_LIST,
    payload: posts
})

export const PostListRequestStartAction = ({
    type: types.POST_LIST_REQUEST_START
});

export const PostListRequestFailAction = (error) => ({
    type: types.POST_LIST_REQUEST_FAIL,
    payload: error
})

export const PostCreateNew = (post) => ({
    type: types.POST_CREATE,
    payload: post
})

export const PostDeleteOne = (post) => ({
    type: types.POST_DELETE,
    payload: post
})

export const LikesCreate = (post) => ({
    type: types.LIKES_CREATE,
    payload: post
})

export const EditPost2 = (values) => ({
    type: types.POST_EDIT,
    payload: values
}) 