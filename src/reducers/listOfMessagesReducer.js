import { ADD_ALL_PRIVATE_MESSAGES } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case ADD_ALL_PRIVATE_MESSAGES:
        return Object.assign({}, state, {
            allChats: action.allMsgs
         })

        default:
        return state
    }
}
