import {  GET_USER_INFO } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case GET_USER_INFO:
        const {userData: user} = action.payload.data
        return Object.assign({}, state, { user })

        default:
        return state;
    }
}
