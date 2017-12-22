import Axios from '../axios'

export const ADD_NEW_PRIVATE_MSG = 'add_new_private_msg'
export const LOAD_PREVIOUS_PRIVATE_MSGS = 'load_previous_private_msgs'
export const ADD_PEOPLE_FROM_SAME_CITY = 'add_people_from_same_city'
export const UPDATE_PROFILE_PICTURE = 'update_profile_picture'
export const GET_USER_INFO = 'get_user_info'
export const UPDATE_USER_PERSONAL_INFORMATION = 'update_user_persona_information'
const CREATE_NEW_USER = 'create_new_user'
const LOG_USER_IN = 'log_user_in'


export function createNewUser(firstname, lastname, email, password, gender, locReplace) {
    console.log(firstname, lastname, email, password, gender);
    const request = Axios.post('/api/registration', {firstname, lastname, email, password, gender})
                    .then(() => locReplace())

    return {
        type: CREATE_NEW_USER,
        payload: request
    }
}

export function logUserIn(email, password, locReplace) {
    console.log(email, password);
    const request = Axios.post('/api/login', {email, password})
                    .then(() => locReplace())

    return {
        type: LOG_USER_IN,
        payload: request
    }
}

export function getUserinfo() {
    const request = Axios.get('/api/user')

    return {
        type: GET_USER_INFO,
        payload: request
    }
}

export function uploadPic(image, callback) {
    const request =  Axios.post('/api/updatepicture', image)
                     .then(() => callback())

    return {
        type: UPDATE_PROFILE_PICTURE,
        payload: request
    }

}

export function updateUserInfo(age, bio, lat, lng, city, callback) {
    const request = Axios.post('/api/updateUserInfo', {age, bio, lat, lng, city})
                    .then(() => callback())

    return {
        type: UPDATE_USER_PERSONAL_INFORMATION,
        payload: request
    }
}

export function addPeopleFromSameCity(city) {
    const request = Axios.post('/api/findPeopleFromSameCity', city)

    return {
        type: ADD_PEOPLE_FROM_SAME_CITY,
        payload: request
    }
}

export function loadPreviousPrivateMsgs(prevPrivMsgs) {

    return {
        type: LOAD_PREVIOUS_PRIVATE_MSGS,
        prevPrivMsgs
    }
}

export function addNewMsg(newChatMsg) {
    console.log('in action', newChatMsg);
    return {
        type: ADD_NEW_PRIVATE_MSG,
        newChatMsg
    }
}
