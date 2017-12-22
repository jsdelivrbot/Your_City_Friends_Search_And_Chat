import { combineReducers } from 'redux';
import loggedInUserReducer from './reducer_user'
import otherUserReducer from './otherUserReducer'
import chatReducer from './chatReducer'
//***
import { reducer as formReducer } from 'redux-form'
//***

const rootReducer = combineReducers({
    user: loggedInUserReducer,
    usersFromSameCity: otherUserReducer,
    chat: chatReducer,
    form: formReducer
});

export default rootReducer;
