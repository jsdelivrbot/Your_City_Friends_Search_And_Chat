import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Redirect, IndexRoute, hashHistory, browserHistory } from 'react-router';
// __ __ __ __ __ __  Components  __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
//*******************************
// ***** Log-out components *****
import Welcome from './components/welcome'
import Login from './components/login'
import Register from './components/register'
//*******************************
// ***** Log-in components ******
import App from './components/app'
import DesignedTrip from './components/designedtrip'
import CreateTrip from './components/createtrip'
import MapContainer from './components/mapcontainer';
// __ __ __ __ __ __ __  Redux __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import reduxPromise from 'redux-promise'
import reducer from './reducer'
//exporting to make it available to socket
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)))

const notLoggedInRouter = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Welcome}>
            <Route path="/login" component={Login}/>
            <IndexRoute component={Register}/>
      	    </Route>
        </Router>
    </Provider>
);

const loggedInRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            <IndexRoute component={DesignedTrip}/>
            <Route path="createTrip" component={CreateTrip}/>
            <Route path="map" component={MapContainer}/>
      	    </Route>
        </Router>
    </Provider>
);
const router = location.pathname === '/welcome/' ? notLoggedInRouter : loggedInRouter

ReactDOM.render(router, document.querySelector('main'));

// <IndexRoute component={ProfilePic}/>
// <Route path="friends" component={Friends}/>
// <Route path="private_chat/:id" component={PrivateChat}/>
// <Route path="user/:id" component={OtherUsersProfile}/>
// <Route path="online" component={Online}/>
// <Route path="chat" component={Chat}/>
// <Route path="notFound" component={NotFound}/>
// <Redirect from="*" to="/" />
