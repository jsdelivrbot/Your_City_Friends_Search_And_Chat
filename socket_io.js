console.log('here');
const { loadPrivateMasseges, addPrivMsgToDb } = require('./database/database')
module.exports = function(app, io) {

let webSockets = []

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);



    socket.on('chat', ({recipientId}) => {
    console.log(recipientId);
    const {id: userId} = webSockets.filter(sngSocket => sngSocket.socketId === socket.id)[0]
    console.log('iserId', userId);
    loadPrivateMasseges(userId, recipientId)
        .then((prevPrivMsgs) => {
            io.sockets.sockets[socket.id].emit('prevPrivateChatMsgs', (prevPrivMsgs))
        })
        .catch((error) => {
            console.log('error loading previous private chat msgs: ', error);
        })
    })

    socket.on('newChatMsg', ({newPrivateMsg, recipientId}) => {
        const {id: userId} = webSockets.filter(sngSocket => sngSocket.socketId === socket.id)[0]

        console.log('websockets', webSockets);
        console.log(`${webSockets} e anche ${userId}`);
        recipientId = parseInt(recipientId)

        addPrivMsgToDb(newPrivateMsg, userId, recipientId)
        .then(({userMessage, friendMessage}) => {
            console.log('done!', userMessage, friendMessage);
            const senderSocket = webSockets.filter(webSocket => webSocket.id == userId).map(senderSocket => senderSocket.socketId)
            const recipientSocket = webSockets.filter(webSocket => webSockets.id == recipientId).map(recSocket => recSocket.socketId)
            console.log(`sender: ${senderSocket}, receiver: ${recipientSocket}`);

            if(senderSocket.length > 1) {
                for(let sock = 0; sock < senderSocket.length; sock++) {
                    io.sockets.sockets[senderSocket[sock]].emit('newChatMsg', userMessage)
                }
            } else {
                io.sockets.sockets[senderSocket].emit('newChatMsg', userMessage)
            }

            if(recipientSocket.length > 0){
                if(recipientSocket.length > 1) {
                    for(let recSock = 0; recSock < recipientSocket.length; recSock++) {
                        io.sockets.sockets[recipientSocket[recSock]].emit('newChatMsg', friendMessage)
                    }
                } else {
                    io.sockets.sockets[recipientSocket].emit('newChatMsg', friendMessage)
                }
            } else {
                return;
            }
        })
    })

});

app.get('/connected/:socketId', (req, res, next) => {
    const {socketId} = req.params
    const {id} = req.session.user

    let userJoined = webSockets.every(webSocket => webSocket.userId !== id)

    webSockets.push({ id, socketId })

    console.log(`${socketId} belongs to userId ${id}`);

    if (userJoined) {
        console.log(`user Joined: ${userJoined}, with id: ${id}`);
        // io.sockets.sockets[socketId].broadcast.emit('userIsOnline', user)
    }

    io.sockets.sockets[socketId].on("disconnect", () => {
            // Updating the list of WebSockets
            webSockets = webSockets.filter(webSocket => webSocket.id !== id)
            // Checking if the user left
            userLeft = webSockets.every(webSocket => webSocket.id !== id)
            // If the user left, send his ID to all users still connected
            console.log('after disconnection', webSockets);
        })

    console.log('total sockets', webSockets);
})
}
