const express = require('express'),
      router = express.Router(),
      {registerNewUser, verifyUserCredential, getUserInformation, getUserProfileInfo, addProfilePicture, updateUserPersonalInfo} = require('../database/database.js')
      const {uploader, uploadAWS3} = require('../storage')

router.post('/api/registration', (req, res, next) => {
    const {firstname, lastname, email, password, gender} = req.body
    console.log('gender:', gender);
    registerNewUser(firstname, lastname, email, password, gender)
    .then((userData) => {
        req.session.user = {user: true, id: userData.id, firstname: userData.firstname, lastname: userData.lastname}
        res.json({success: true, userData})
    })
    .catch((error) => {
        console.log(error);
        next('error during adding user')
    })
})

router.post('/api/login', (req, res, next) => {
    console.log(req.body);
    const {email, password} = req.body
    verifyUserCredential(email, password)
    .then((userData) => {
        req.session.user = {user: true, id: userData.id, firstname: userData.name, lastname: userData.lastname, gender: userData.gender}
        res.json({success: true, userData})
    })
    .catch((error) => {
        next('error verifying credentials')
    })
})


// 1 version
// router.get('/api/user', (req, res, next) => {
//     const {id} = req.session.user
//     console.log('user');
//     getUserInformation(id)
//     .then((userData) => {
//         console.log(userData);
//         getUserProfileInfo(id)
//         .then((profileData) => {
//             console.log(profileData);
//             if(profileData) {
//                 console.log('userData & profileData: ', userData, profileData)
//                 res.json({success: true, userData})
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     })
//     .catch((error) => {
//         next('error retriving user information')
//     })
// })

// 2 version:


router.get('/api/user', (req, res, next) => {
    const {id} = req.session.user
    getUserInformation(id)
    .then((userData) => {
        res.json({success: true, userData})
    })
    .catch((error) => {
        console.log('error:', error);
        next('error retriving user information',)
    })
})



router.post('/api/updatepicture', uploader.single('file'), (req, res) => {
    const {mimetype, filename} = req.file
    const {id} = req.session.user
    if(mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/jpg' || mimetype === 'image/gif') {
        uploadAWS3(req.file)
        .then(() => {
            addProfilePicture(filename, id)
                .then((userData) => {
                    res.json({ success: true, userData })
                }).catch((error) => {
                    res.json({ success: false, error: true})
                });
        })
        .catch((err) => {
            console.log(err);
            throw 'Error in adding profile picture to the database'
        })
    } else {
        res.json({ success: false, imageFormatInvalid: true });
    }
});


router.post('/api/updateUserInfo', (req, res) => {
    console.log(req.body);
    const {age, bio, lat, lng, city} = req.body
    const {id} = req.session.user

    updateUserPersonalInfo(id, age, bio, city, lat, lng)
    .then((userData) => {
        console.log(userData);
        res.json({ success: true, userData })
    })
    .catch((error) => {
        throw 'error updating information into the database'
    })
})


module.exports = router
