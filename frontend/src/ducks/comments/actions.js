import types from './types';

export const CommentListRequestAction = (posts) => ({
    type: types.COMMENTS_LIST,
    payload: posts
})

export const CommentListRequestStartAction = ({
    type: types.COMMENTS_LIST_REQUEST_START
});

export const CommentListRequestFailAction = (error) => ({
    type: types.COMMENTS_LIST_REQUEST_FAIL,
    payload: error
})

export const CommentCreateNew = (post) => ({
    type: types.COMMENTS_CREATE,
    payload: post
})

export const CommentDeleteOne = (post) => ({
    type: types.COMMENTS_DELETE,
    payload: post
})

export const EditComment2 = (values) => ({
    type: types.COMMENT_EDIT,
    payload: values
}) 