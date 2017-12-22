import Axios from './axios'

export function registerNewUser(firstname, lastname, email, password, gender){
    console.log('in action');
    return Axios.post('/api/registration', {firstname, lastname, email, password, gender})
    .then(({data})=>{
        const {userData} = data
        console.log('in action', userData);
        location.replace('/')
        return {}
        //   type: 'REGISTER_USER',
        //   //data: id, firstname, lastname
        //   user: userData
        // }
    })
}


export function verifyCredential(email, password) {
    return Axios.post('/api/login', {email, password})
    .then(({data}) => {
        const {userData} = data
        location.replace('/')
        return {}
    })
}

export function getUserinfo() {
    return Axios.get('/api/user')
    .then(({data}) => {
        console.log('data from action', data);
        return {
            type: 'GET_USER_INFO',
            //data: id, firstname, lastname
            user: data.userData
        }
    })
}

export function uploadImagePicture(formData) {
    console.log('action formData',formData);
    return Axios.post('/api/updatepicture', formData)
    .then(({data}) => {
        return {
            type: 'UPLOAD_USER_PROFILE_PICTURE',
            user: data.userData
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

export function updateUserInfo(age, bio, lat, lng, city) {
    return Axios.post('/api/updateUserInfo', {age, bio, lat, lng, city})
    .then(({data}) => {
        console.log('in actioooon:', data.userData);
        return {
            type: 'UPDATE_USER_PERSONAL_INFORMATION',
            user: data.userData
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

export function displayInfoWheather(lat, lng) {
    // return Axios.get(`https://api.darksky.net/forecast/093be28efafdfc4494116dc39632d827/${lat},${lng}?exclude=minutely,currently&extend=hourly`)
    return Axios.get(`https://api.darksky.net/forecast/093be28efafdfc4494116dc39632d827/${lat},${lng}`)
    .then((wheatherCondition) => {
        console.log('in action:', wheatherCondition.data.currently.temperature);

        return {
            type: 'ADD_WHEATHER_CONDITION',
            wheather: wheatherCondition.data
        }
    })
}
