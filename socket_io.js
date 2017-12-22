
const { loadPrivateMasseges, addPrivMsgToDb } = require('./database/database')
module.exports = function(app, io) {

let webSockets = []
let loggedInUser

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('chat', ({recipientId}) => {

    loadPrivateMasseges(loggedInUser, recipientId)
        .then((prevPrivMsgs) => {
            io.sockets.sockets[socket.id].emit('prevPrivateChatMsgs', (prevPrivMsgs))
        })
        .catch((error) => {
            console.log('error loading previous private chat msgs: ', error);
        })
    })

    socket.on('newChatMsg', ({newPrivateMsg, recipientId}) => {
        const {id: userId} = webSockets.filter(sngSocket => sngSocket.socketId === socket.id)[0]

        recipientId = parseInt(recipientId)

        addPrivMsgToDb(newPrivateMsg, userId, recipientId)
        .then(({userMessage, friendMessage}) => {
            const senderSocket = webSockets.filter(webSocket => webSocket.id == userId).map(senderSocket => senderSocket.socketId)

            const recipientSocket = webSockets.filter(webSocket => webSocket.id == recipientId).map(recSocket => recSocket.socketId)

            if(senderSocket.length > 1) {
                for(let sock = 0; sock < senderSocket.length; sock++) {
                    io.sockets.sockets[senderSocket[sock]].emit('newChatMsg', userMessage)
                }
            } else {
                io.sockets.sockets[senderSocket].emit('newChatMsg', userMessage)
            }

            if(recipientSocket.length > 0){
                if(recipientSocket.length > 1) {
                    console.log('emitting new msg to recipientSocket', recipientSocket);
                    for(let recSock = 0; recSock < recipientSocket.length; recSock++) {
                        io.sockets.sockets[recipientSocket[recSock]].emit('newChatMsg', friendMessage)
                    }
                } else {
                    console.log('emitting new msg to recipientSocket', recipientSocket);
                    io.sockets.sockets[recipientSocket].emit('newChatMsg', friendMessage)
                }
            } else {
                console.log('false');
                return;
            }
        })
    })

});

app.get('/connected/:socketId', (req, res, next) => {
    const {socketId} = req.params
    const {id} = req.session.user
    loggedInUser = id
    webSockets.push({ id, socketId })

    console.log('user came: updating list of websockets', );
    console.log(`${socketId} belongs to userId ${id}`);


    io.sockets.sockets[socketId].on("disconnect", () => {
            // Updating the list of WebSockets
            webSockets = webSockets.filter(webSocket => webSocket.socketId !== socketId)

        })
        return res.json({ success: true })
    console.log('total sockets', webSockets);
})
}
