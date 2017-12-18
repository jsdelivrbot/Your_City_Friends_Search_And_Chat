export default function(state={}, action) {
     switch (action.type) {

         // case "REGISTER_USER":
         //
         //
         //   state = Object.assign({}, state, {
         //       user: action.user
         //   })
         //   break

        case "GET_USER_INFO":
        console.log('in reducer',action.user);
        state = Object.assign({}, state, {
            user: action.user
        })
        break

        case "UPLOAD_USER_PROFILE_PICTURE":
        console.log('reducer upload');
        state = Object.assign({}, state, {
            user: action.user
        })
        break

        case "UPDATE_USER_PERSONAL_INFORMATION":
        console.log('user info:', action.user);
        state = Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                age: action.user.age,
                bio: action.user.bio,
                city: action.user.city,
                lat: action.user.lat,
                lng: action.user.lng
            })
        })
        break

        case "ADD_WHEATHER_CONDITION":
        state = Object.assign({}, state, {
            wheather: action.wheather
        })
        break
    }
    return state
}
