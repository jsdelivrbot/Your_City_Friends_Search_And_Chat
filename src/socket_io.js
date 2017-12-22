import * as io from 'socket.io-client'
import { store } from './start'
import { } from './actions'
import Axios from './axios'
import { loadPreviousPrivateMsgs, addNewMsg } from './actions/index'
let socket

console.log('socket connectefd!!!');

export default function getSocket() {
    if(!socket) {
        socket = io.connect()
        // socket =   io.connect({upgrade: false, transports: ['websocket']})
        socket.on('connect', () => {
            Axios.get(`/connected/${socket.id}`)
        })
        socket.on('prevPrivateChatMsgs', (prevPrivMsgs) => {
            store.dispatch(loadPreviousPrivateMsgs(prevPrivMsgs))
        })

        socket.on('newChatMsg', (newChatMsg) => {
            console.log('newChatMsg', newChatMsg);
            store.dispatch(addNewMsg(newChatMsg))
        })
    }
    return socket
}
