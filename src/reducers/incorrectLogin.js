import { LOG_USER_IN, CREATE_NEW_USER } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case LOG_USER_IN:
        return Object.assign({}, state, {
             login: action.payload
         })

         case CREATE_NEW_USER:
         console.log('reducer Registration', action);
         return Object.assign({}, state, {
              registration: action.payload
          })

        default:
        return state
    }
}
