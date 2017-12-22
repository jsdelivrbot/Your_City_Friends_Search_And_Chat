import { combineReducers } from 'redux';
import loggedInUserReducer from './reducer_user'
// import Postsreducer from './reducer_posts'
//***
import { reducer as formReducer } from 'redux-form'
//***
const rootReducer = combineReducers({
    user: loggedInUserReducer,
    form: formReducer
});

export default rootReducer;
