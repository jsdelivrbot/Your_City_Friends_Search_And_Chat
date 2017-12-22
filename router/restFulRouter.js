const express = require('express'),
      router = express.Router(),
      {registerNewUser, verifyUserCredential, lookForAddressInformation, getUserInformation, getUserProfileInfo, addProfilePicture, updateUserPersonalInfo, findPeopleFromSameCity} = require('../database/database.js')
      const {uploader, uploadAWS3} = require('../storage')

router.post('/api/registration', (req, res, next) => {
    const {firstname, lastname, email, password, gender} = req.body
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
        req.session.user = {user: true, id: userData.id, firstname: userData.firstname, lastname: userData.lastname, gender: userData.gender}
        res.json({success: true, userData})
        lookForAddressInformation(req.session.user.id)
        .then((address) => {
            if(typeof address !== 'undefined') {
                req.session.user.city = address.city,
                req.session.user.lat = address.lat,
                req.session.user.lng = address.lng
            }
        })
        .catch((error) => {
            console.log(error);

        })
    })
    .catch((error) => {
        console.log(error);
        next('error verifying credentials')
    })
})

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
        req.session.user.city = userData.city
        res.json({ success: true, userData })
    })
    .catch((error) => {
        throw 'error updating information into the database'
    })
})

router.post('/api/findPeopleFromSameCity', (req, res) => {
    const {city} = req.body

    findPeopleFromSameCity(city)
    .then((usersData) => {
        res.json({ success: true, usersData })
    })
    .catch((error) => {
        console.log(error);
    })
})


module.exports = router
