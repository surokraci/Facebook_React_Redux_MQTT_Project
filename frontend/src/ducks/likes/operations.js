import axios from "axios";
import * as actions from './actions';
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';
const record = {topic:"default",qos: 2};
const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
const publish = (payload) => {mqttPublish({...record,...payload})};
const subscribe = (topic)=>{mqttSub({...record,"topic":topic});console.log('sub')};
const unsubscribe = (topic)=>{mqttUnSub({...record,"topic":topic});console.log('unsub');};

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
            unsubscribe(`newLike/plus`);
            publish({"topic":`newLike/plus`,"payload":JSON.stringify(value)})
            subscribe(`newLike/plus`);        
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
            unsubscribe(`newLike/minus`);
            publish({"topic":`newLike/minus`,"payload":JSON.stringify(value)})
            subscribe(`newLike/minus`);           
        }catch(ex) {
            console.log(ex);;
        }
    }
}

export const thumbMQTTUp = (likes) =>{
    return async dispatch=>{
        dispatch(actions.LikesAdd(likes))
    }
}

export const thumbMQTTDown = (likes) =>{
    return async dispatch=>{
        dispatch(actions.LikesRemove(likes))
    }
}