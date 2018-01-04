import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
// __ __ __ __ __ __  Components  __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
//*******************************
// ***** Log-out components *****
import Welcome from './components/welcome'
import Login from './components/login'
import Register from './components/register'
import WelcomeLayout from './components/welcomeLayout'
//*******************************
// ***** Log-in components ******
import App from './components/app'
import userAddress from './components/userAddress'
import UpdateProfilePic from './components/updateProfilePic'
import UserFromSameCity from './components/userFromSameCity'
import Chat from './components/chat'
import Layout from './components/layout'
import Header from './components/header'
import ActiveChatList from './components/activeChatList'
// __ __ __ __ __ __ __  Redux __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import reducers from './reducers'
//exporting to make it available to socket
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise)))
const store_notLoggedInRouter = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

const notLoggedInRouter = (
    <Provider store={store_notLoggedInRouter}>
        <WelcomeLayout>
            <HashRouter>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Welcome}/>
          	    </Switch>
            </HashRouter>
        </WelcomeLayout>
    </Provider>
);



const loggedInRouter = (
    <Provider store={store}>
        <Layout>
            <BrowserRouter>
                <Switch>
                    <div>
                        <nav>
                            <li><Link to="/"><img className="nav-links" src="../css/home.png"/></Link></li>
                            <li><Link to="/userFromSameCity"><img className="nav-links" src="../css/find-city-friends.png"/></Link></li>
                            <li><Link to="/userAddress"><img className="nav-links" src="../css/update-info.svg"/></Link></li>
                            <li><Link to="/activeChatList"><img className="nav-links" src="../css/chat-logo.png"/></Link></li>
                        </nav>
                        <Route exact path="/" component={App}/>
                        <Route path="/chat/:id" component={Chat}/>
                        <Route path="/updateProfPic" component={UpdateProfilePic}/>
                        <Route path="/userAddress" component={userAddress}/>
                        <Route path="/userFromSameCity" component={UserFromSameCity}/>
                        <Route path="/activeChatList" component={ActiveChatList}/>
                    </div>
                </Switch>
            </BrowserRouter>
        </Layout>
    </Provider>
);
const routerDom = location.pathname === '/welcome/' ? notLoggedInRouter : loggedInRouter

ReactDOM.render(routerDom, document.querySelector('main'));
