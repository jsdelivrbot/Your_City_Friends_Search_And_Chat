import * as io from 'socket.io-client'
import { store } from './start'
import { } from './actions'
import Axios from './axios'
let socket

console.log('socket connectefd!!!');

export default function getSocket() {
    if(!socket) {
        socket = io.connect()
        // socket =   io.connect({upgrade: false, transports: ['websocket']})
        socket.on('connect', () => {
            Axios.get(`/connected/${socket.id}`)
        })

    }
    return socket
}
