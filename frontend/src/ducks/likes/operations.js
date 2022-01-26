import axios from "axios";
import * as actions from './actions';

export const getLikesList = () => {
    return async dispatch => {
        dispatch(actions.LikesListRequestStartAction);
        console.log('Likes GET');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/likes');
                console.log(response);
                dispatch(actions.LikesListRequestAction(response.data.likes));        
            }catch(error) {
                dispatch(actions.LikesListRequestFailAction(error));
            }
        }, 0)
    }
}

export const LikePlus = (value) =>{
    return async dispatch=>{
        console.log(value);
        try{
            const response = await axios.put(`http://localhost:5000/likes/like/${value._id}`, value);
            console.log(response);;
            await dispatch(actions.LikesAdd(value))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const LikeMinus = (value) =>{
    return async dispatch=>{
        console.log(value);
        try{
            const response = await axios.put(`http://localhost:5000/likes/dislike/${value._id}`, value);
            console.log(response);;
            await dispatch(actions.LikesRemove(value))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}