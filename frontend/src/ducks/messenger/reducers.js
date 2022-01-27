const messengerReducer =(state =[], action)=>{
    switch(action.type){
        case 'MESSAGE_ADD':
            return [...state, action.payload];
        default:
            return state;

    }
}

export default messengerReducer;