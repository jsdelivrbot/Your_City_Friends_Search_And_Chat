console.log('here');

module.exports = function(app, io) {

let webSockets = []

io.on('connection', function(socket) {
console.log(`socket with the id ${socket.id} is now connected`);

socket.on('disconnect', function() {
    console.log(`socket with the id ${socket.id} is now disconnected`);
});

socket.on('thanks', function(data) {
    console.log(data);
});

socket.emit('welcome', {
    message: 'Welome. It is nice to see you'
});
});

app.get('/connected/:socketId', (req, res, next) => {
    const {socketId} = req.params
    const {id} = req.session.user

    let userJoined = webSockets.every(webSocket => webSocket.userId !== id)

    webSockets.push({ id, socketId })

    console.log(`${socketId} belongs to userId ${id}`);
})
}
