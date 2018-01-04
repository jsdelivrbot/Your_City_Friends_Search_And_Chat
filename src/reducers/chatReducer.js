import { LOAD_PREVIOUS_PRIVATE_MSGS, ADD_NEW_PRIVATE_MSG } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case LOAD_PREVIOUS_PRIVATE_MSGS:
        var {recipientId, privMsgs} = action.prevPrivMsgs
        return Object.assign({}, state, {
             [recipientId]: privMsgs.reverse()
         })


        case ADD_NEW_PRIVATE_MSG:
        var {recipientId, message} = action.newChatMsg

        return Object.assign({}, state, {
            [recipientId]: [...state[recipientId], message]
        })


        default:
        return state
    }
}
