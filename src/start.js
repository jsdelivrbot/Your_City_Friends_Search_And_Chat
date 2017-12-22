import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
// __ __ __ __ __ __  Components  __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
//*******************************
// ***** Log-out components *****
import Welcome from './components/welcome'
import Login from './components/login'
import Register from './components/register'
//*******************************
// ***** Log-in components ******
import App from './components/app'
import userAddress from './components/userAddress'
import UpdateProfilePic from './components/updateProfilePic'
import UserFromSameCity from './components/userFromSameCity'
import Chat from './components/chat'
// __ __ __ __ __ __ __  Redux __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import promise from 'redux-promise'
import reducers from './reducers'
//exporting to make it available to socket
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise)))

const notLoggedInRouter = (
    <Provider store={store}>
        <HashRouter>
            <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Welcome}/>
      	    </Switch>
        </HashRouter>
    </Provider>
);


const loggedInRouter = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
            <Route path="/chat/:id" component={Chat}/>
            <Route path="/userFromSameCity" component={UserFromSameCity}/>
            <Route path="/updateProfPic" component={UpdateProfilePic}/>
            <Route path="/userAddress" component={userAddress}/>
            <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
);
const routerDom = location.pathname === '/welcome/' ? notLoggedInRouter : loggedInRouter

ReactDOM.render(routerDom, document.querySelector('main'));
