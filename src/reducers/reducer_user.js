import {  GET_USER_INFO,
          UPDATE_PROFILE_PICTURE,
          UPDATE_USER_PERSONAL_INFORMATION
       } from '../actions/index'

export default function(state = {}, action) {
    switch(action.type) {

        case GET_USER_INFO:
        console.log('in reducer');
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


// export default function(state = {}, action) {
//
//         if(action.type==GET_USER_INFO) {
//             const {userData: user} = action.payload.data
//             state = Object.assign({}, state, { user })
//         }
//         if(action.type==UPDATE_PROFILE_PICTURE) {
//             console.log('AOOOOOOOOOOOO');
//             console.log('AOOOOOOO!!! MA NON ARRRIVIAMO MAI QUI',action.payload);
//         }
//     return state;
// }
