import { combineReducers } from 'redux';
import loggedInUserReducer from './reducer_user'
import otherUserReducer from './otherUserReducer'
import chatReducer from './chatReducer'
import listOfMessagesReducer from './listOfMessagesReducer'
import incorrectLogin from './incorrectLogin.js'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    login: incorrectLogin,
    registration: incorrectLogin,
    user: loggedInUserReducer,
    usersFromSameCity: otherUserReducer,
    chat: chatReducer,
    allChats: listOfMessagesReducer,
    form: formReducer
});




export default rootReducer;
