import axios from "axios";
import * as actions from './actions';

export const getUsersList = () => {
    return async dispatch => {
        dispatch(actions.UserListRequestStartAction);
        console.log('Users GET');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/users');
                console.log(response.data.users);
                dispatch(actions.UserListRequestAction(response.data.users));        
            }catch(error) {
                dispatch(actions.UserListRequestFailAction(error));
            }
        }, 0)
    }
}

export const loginUser = (data) => {
    console.log(data);
    return async dispatch => {
        await dispatch(actions.UserLogin(data));
        console.log('Users Login');
    }
}

export const addNewUser = (value) =>{
    return async dispatch=>{
        console.log('new user');
        try{
            const response = await axios.post('http://localhost:5000/users', value);
            console.log(response);;
            dispatch(actions.UserCreateNew(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const editUser = (value) =>{
    return async dispatch=>{
        console.log('edit user');
        try{
            const response = await axios.put(`http://localhost:5000/users/${value._id}`, value);
            console.log(response);;
            dispatch(actions.EditUser(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const DeleteUser = (value) =>{
    return async dispatch=>{
        console.log('delete user');
        try{
            const response = await axios.delete(`http://localhost:5000/users/${value}`);
            console.log(response);;
            dispatch(actions.UserDeleteOne(response.data))        
        }catch(ex) {
            console.log(ex);;
        }
    }
}