import { LOAD_PREVIOUS_PRIVATE_MSGS, ADD_NEW_PRIVATE_MSG } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {
        case LOAD_PREVIOUS_PRIVATE_MSGS:
        var {recipientId, privMsgs} = action.prevPrivMsgs
        return Object.assign({}, state, {
             chat: Object.assign({},state.chat,{
                [recipientId]: privMsgs.reverse()})
        })

        case ADD_NEW_PRIVATE_MSG:

        var {recipientId, message} = action.newChatMsg
        console.log('in reduceeeer', action);
            return Object.assign({}, state, {
                chat: Object.assign({},state.chat,{
                [recipientId]: [...state.chat[recipientId], message]
            })
           })

        default:
        return state
    }
}
