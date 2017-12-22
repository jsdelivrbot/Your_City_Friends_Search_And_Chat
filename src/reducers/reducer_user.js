import {  GET_USER_INFO,
          UPDATE_PROFILE_PICTURE,
          UPDATE_USER_PERSONAL_INFORMATION
       } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {


        case GET_USER_INFO:
        const {userData: user} = action.payload.data
        return Object.assign({}, state, { user })



        // case UPDATE_USER_PERSONAL_INFORMATION:
        // console.log('reducer:', action);
        // return Object.assign({}, state, {
        //         user: Object.assign({}, state.user, {
        //             age: action.user.age,
        //             bio: action.user.bio,
        //             city: action.user.city,
        //             lat: action.user.lat,
        //             lng: action.user.lng
        //         })
        //     })

        default:
        return state;
    }
}
