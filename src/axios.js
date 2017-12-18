import axios from 'axios';

const Axios = axios.create({
    xsrfCookieName: 'soctok',
    xsrfHeaderName: 'csrf-token'
});

export default Axios
