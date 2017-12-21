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
import DesignedTrip from './components/designedtrip'
import CreateTrip from './components/createtrip'
// __ __ __ __ __ __ __  Redux __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import promise from 'redux-promise'
import reducers from './reducers'
// import reducers from './reducer'
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


// const loggedInRouter = (
//     <Provider store={store}>
//         <BrowserRouter>
//             <Route path="/" component={App}>
//             <IndexRoute component={DesignedTrip}/>
//             <Route path="createTrip" component={CreateTrip}/>
//       	    </Route>
//         </BrowserRouter>
//     </Provider>
// );
const routerDom = location.pathname === '/welcome/' ? notLoggedInRouter : loggedInRouter

ReactDOM.render(routerDom, document.querySelector('main'));
