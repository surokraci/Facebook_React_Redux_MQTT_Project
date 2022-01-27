import axios from "axios";
import * as actions from './actions';
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';
const record = {topic:"default",qos: 2};
const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
const publish = (payload) => {mqttPublish({...record,...payload})};
const subscribe = (topic)=>{mqttSub({...record,"topic":topic});console.log('sub')};
const unsubscribe = (topic)=>{mqttUnSub({...record,"topic":topic});console.log('unsub');};

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
            unsubscribe(`newPost/likes`);
            unsubscribe(`newPost/post`);
            publish({"topic":`newPost/likes`,"payload":JSON.stringify(response.data.newLikes)})
            publish({"topic":`newPost/post`,"payload":JSON.stringify(response.data.newPost)})
            subscribe(`newPost/likes`);
            subscribe(`newPost/post`);
            
            

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
            unsubscribe(`newPost/delete`);
            publish({"topic":`newPost/delete`,"payload":JSON.stringify(response.data)})
            subscribe(`newPost/delete`);
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
            unsubscribe(`newPost/edit`);
            publish({"topic":`newPost/edit`,"payload":JSON.stringify(response.data)})
            subscribe(`newPost/edit`);        
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const addNewMQTTPost = (post) =>{
    return async dispatch=>{
        dispatch(actions.PostCreateNew(post))
    }
}

export const addNewMQTTLikes = (likes) =>{
    return async dispatch=>{
        dispatch(actions.LikesCreate(likes))
    }
}

export const DeleteMQTTPost = (data) =>{
    return async dispatch=>{
        dispatch(actions.PostDeleteOne(data))
    }
}

export const EditMQTTPost = (data) =>{
    console.log('edytowano');
    return async dispatch=>{
        dispatch(actions.EditPost2(data))
    }
}