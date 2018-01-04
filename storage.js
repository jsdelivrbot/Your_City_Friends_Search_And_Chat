const fs = require('fs'),
      knox = require('knox'),
      bucket = require('./config.json').bucket,
      multer = require('multer'),
      compression = require('compression'),
      uidSafe = require('uid-safe'),
      path = require('path')


const diskStorage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, `${__dirname}/uploads`)
    },
    filename: function (req, file, callback){
        uidSafe(24).then(function(uid){
            callback(null, uid + path.extname(file.originalname))
        })
    }
})

module.exports.uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
})

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('./key');
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: bucket
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.uploadAWS3 = function(file) {
    return new Promise((resolve, reject) => {
        const s3Request = client.put(file.filename, {
            'Content-Type': file.mimetype,
            'Content-Length': file.size,
            'x-amz-acl': 'public-read'
        });
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(s3Request);
        s3Request.on('response', s3Response => {
           const wasSuccessful = s3Response.statusCode == 200;
           if(wasSuccessful) {
               resolve();
           } else {
               reject();
           }
        });
    });
};
