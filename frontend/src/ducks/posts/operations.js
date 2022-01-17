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