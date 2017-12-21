import Axios from '../axios'

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
