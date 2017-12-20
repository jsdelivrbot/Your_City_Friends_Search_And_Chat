const express = require('express'),
      app = express(),
      compression = require('compression'),
      restfulRouter = require('./router/restfulRouter'),
      port = process.env.PORT || 8080,
      bodyParser = require('body-parser'),
      cookieSession = require('cookie-session'),
      path = require('path'),
      csurf = require('csurf'),
      secret = require('./secret.json').secret,
      multer = require('multer'),
      uidSafe = require('uid-safe'),
      {upload} = require('./storage'),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      // ==================================================================== \\
      socket_io = require('./socket_io')
//aoooo
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

//[Csurf] __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('soctok', req.csrfToken());
    next();
});
// __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\

// __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
//[socket_io] __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
socket_io(app, io)
// __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\

// __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
})

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2597152
    }
})
// __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ \\


if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }))
}


app.use(express.static('./public'))

app.use('/', restfulRouter)


app.get("/welcome/", (req, res) => {
    console.log('session', req.session.user);
    // req.session.user ? res.redirect("/") : res.sendFile(`${__dirname}/index.html`)
    if(req.session.user) {
        console.log('session is present');
        res.redirect("/")
    } else {
        console.log('session is not present');
        res.sendFile(`${__dirname}/index.html`)
    }
})

app.get("*", (req, res) => {
    console.log('session', req.session.user);
    // !req.session.user && req.url != '/welcome/' ? res.redirect("/welcome/") : res.sendFile(`${__dirname}/index.html`)
    if(!req.session.user && req.url != '/welcome/') {
        console.log('first case');
        res.redirect("/welcome/")
    } else {
        console.log('second case');
        res.sendFile(`${__dirname}/index.html`)
    }
})


app.use((err, req, res, next) => {
  console.log(`Error Handling Middleware --> ${err}`)
  res.status(500).json({success:false})
})



server.listen(port, () => {
    console.log(`Listening on ${port}`)
});
