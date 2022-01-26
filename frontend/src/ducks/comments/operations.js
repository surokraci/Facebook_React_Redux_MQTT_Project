import axios from "axios";
import * as actions from './actions';

export const getCommentsList = () => {
    return async dispatch => {
        dispatch(actions.CommentListRequestStartAction);
        console.log('Comments GET');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/comments');
                dispatch(actions.CommentListRequestAction(response.data.comments));        
            }catch(error) {
                dispatch(actions.CommentListRequestFailAction(error));
            }
        }, 0)
    }
}

export const addNewComment = (value) =>{
    return async dispatch=>{
        console.log('new comment');
        try{
            const response = await axios.post('http://localhost:5000/comments', value);
            console.log(response);;
            dispatch(actions.CommentCreateNew(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const DeleteComment = (value) =>{
    return async dispatch=>{
        console.log('delete comment');
        try{
            const response = await axios.delete(`http://localhost:5000/comments/${value}`);
            console.log(response);;
            dispatch(actions.CommentDeleteOne(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const editCom = (value) =>{
    return async dispatch=>{
        console.log('edit com');
        try{
            const response = await axios.put(`http://localhost:5000/comments/${value._id}`, value);
            console.log(response);
            dispatch(actions.EditComment2(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}