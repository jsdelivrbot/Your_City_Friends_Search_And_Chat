import { combineReducers } from 'redux';
import loggedInUserReducer from './reducer_user'
import otherUserReducer from './otherUserReducer'
//***
import { reducer as formReducer } from 'redux-form'
//***

const rootReducer = combineReducers({
    user: loggedInUserReducer,
    usersFromSameCity: otherUserReducer,
    form: formReducer
});

export default rootReducer;
