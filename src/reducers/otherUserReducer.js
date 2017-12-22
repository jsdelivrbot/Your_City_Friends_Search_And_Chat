import { ADD_PEOPLE_FROM_SAME_CITY } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case ADD_PEOPLE_FROM_SAME_CITY:
        const {usersData: users} = action.payload.data

        return Object.assign({}, state, {
            usersFromSameCity: users
        })

        default:
        return state
    }
}
