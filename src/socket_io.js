import * as io from 'socket.io-client'
import Axios from './axios/axios'
import {store} from './start'
import {} from './actions'

let socket

export default function getSocket() {
    if(!socket) {
        socket = io.connect()
        // socket =   io.connect({upgrade: false, transports: ['websocket']})
        socket =   io.connect()
        socket.on('connect', () => {
            Axios.get(`/connected/${socket.id}`)
        })

        socket.on('onlineUsers', (onlineUsers) => {
            onlinepeople = onlineUsers
            store.dispatch(createListOfUsersOnline(onlineUsers))
        })


        socket.on('userJoined', (joinedUser) => {
            if(typeof onlinepeople[0] !== 'undefined' && onlinepeople[0] !== null) {
            const uniqUsers = uniq(joinedUser)
            store.dispatch(informUserJoin(uniqUsers))
            } else {
                return;
            }
        })

        socket.on('userLeft', (offlineUser) => {
            store.dispatch(informUserLeft(offlineUser.userId))
        })

        socket.on('prevPrivateChatMsgs', (prevPrivMsgs) => {
            store.dispatch(loadPreviousPrivateMsgs(prevPrivMsgs))
        })

        socket.on('newPrivateMsg', (newPrivMsg) => {
            store.dispatch(addNewPrivMsg(newPrivMsg))
        });

        socket.on('newchatMsg', (newChatMsg) => {
            store.dispatch(addNewMsg(newChatMsg))
        })

        socket.on('prevChatMsgs', (prevMessages) => {
            store.dispatch(addPrevMsg(prevMessages))
        })

    }
    return socket
}



function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
