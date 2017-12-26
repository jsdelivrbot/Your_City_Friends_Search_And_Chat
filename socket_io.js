
const { loadPrivateMasseges, addPrivMsgToDb, loadAllPrivMsgs } = require('./database/database')
module.exports = function(app, io) {

let webSockets = []

io.on('connection', function(socket) {

    socket.on('disconnect', () => {
        const socketToRemove = webSockets.filter(sock=>sock.socketId===socket.id)[0]
        webSockets.splice(webSockets.indexOf(socketToRemove),1)
    })

    socket.on('allChatMsgs', () => {
    const {id: userId} = webSockets.filter(sngSocket => sngSocket.socketId === socket.id)[0]
    loadAllPrivMsgs(userId)
        .then((allMsgs) => {
            io.sockets.sockets[socket.id].emit('allPrivMsgs', (allMsgs))
        })
        .catch((error) => {
            console.log('error loading all chat messages');
        })
    })

    socket.on('chat', ({recipientId}) => {
    const {id: userId} = webSockets.filter(sngSocket => sngSocket.socketId === socket.id)[0]
    loadPrivateMasseges(userId, recipientId)
        .then((prevPrivMsgs) => {
            io.sockets.sockets[socket.id].emit('prevPrivateChatMsgs', (prevPrivMsgs))
        })
        .catch((error) => {
            console.log('error loading previous private chat msgs: ');
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
    webSockets.push({ id, socketId })
    //[1]
    // io.sockets.sockets[socketId].on("disconnect", () => {
    //         // Updating the list of WebSockets
    //     webSockets = webSockets.filter(webSocket => webSocket.socketId !== socketId)
    //
    // })
    return res.json({ success: true })
    })
 }
