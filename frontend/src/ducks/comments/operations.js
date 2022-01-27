import axios from "axios";
import * as actions from './actions';
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';
const record = {topic:"default",qos: 2};
const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
const publish = (payload) => {mqttPublish({...record,...payload})};
const subscribe = (topic)=>{mqttSub({...record,"topic":topic});console.log('sub')};
const unsubscribe = (topic)=>{mqttUnSub({...record,"topic":topic});console.log('unsub');};

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
            unsubscribe(`newComment/com`);
            publish({"topic":`newComment/com`,"payload":JSON.stringify(response.data)})
            subscribe(`newComment/com`);       
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
            unsubscribe(`newComment/del`);
            publish({"topic":`newComment/del`,"payload":JSON.stringify(response.data)})
            subscribe(`newComment/del`);               
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

export const addNewMQTTCom = (com) =>{
    return async dispatch=>{
        dispatch(actions.CommentCreateNew(com))
    }
}

export const DeleteMQTTCom = (com) =>{
    return async dispatch=>{
        dispatch(actions.CommentDeleteOne(com))
    }
}