import axios from "axios";
import * as actions from './actions';

export const getPostsList = () => {
    return async dispatch => {
        dispatch(actions.PostListRequestStartAction);
        console.log('Posts GET');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/posts');
                dispatch(actions.PostListRequestAction(response.data.posts));        
            }catch(error) {
                dispatch(actions.PostListRequestFailAction(error));
            }
        }, 0)
    }
}

export const addNewPost = (value) =>{
    return async dispatch=>{
        console.log('new post');
        try{
            const response = await axios.post('http://localhost:5000/posts', value);
            console.log(response);;
            await dispatch(actions.LikesCreate(response.data.newLikes))
            dispatch(actions.PostCreateNew(response.data.newPost))
            

        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const DeletePost = (value) =>{
    return async dispatch=>{
        console.log('delete post');
        try{
            const response = await axios.delete(`http://localhost:5000/posts/${value}`);
            console.log(response);;
            dispatch(actions.PostDeleteOne(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const editPost = (value) =>{
    return async dispatch=>{
        console.log('edit post');
        try{
            const response = await axios.put(`http://localhost:5000/posts/${value._id}`, value);
            console.log(response);
            dispatch(actions.EditPost2(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}