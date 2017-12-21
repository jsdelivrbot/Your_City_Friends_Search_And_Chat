import Axios from '../axios'

export const CREATE_NEW_USER = 'create_new_user'

export function createNewUser(firstname, lastname, email, password, gender, locReplace) {
    console.log(firstname, lastname, email, password, gender);
    const request = Axios.post('/api/registration', {firstname, lastname, email, password, gender})
                    .then(() => locReplace())

    return {
        type: CREATE_NEW_USER,
        payload: request
    }
}
