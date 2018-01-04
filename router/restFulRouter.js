const express = require('express'),
      router = express.Router(),
      {registerNewUser, verifyUserCredential, lookForAddressInformation, getUserInformation, getUserProfileInfo, addProfilePicture, updateUserPersonalInfo, findPeopleFromSameCity} = require('../database/database.js')
      const {uploader, uploadAWS3} = require('../storage')
      // Redis Database ==============================================================
      // redis.js exports the functions to query the redis database. It is used to
      // keep track of invalid login attemtps and block accounts if needed
      const redis = require("../redis/redis")

router.post('/api/registration', (req, res, next) => {
    const {firstname, lastname, email, password, gender} = req.body
    registerNewUser(firstname, lastname, email, password, gender)
    .then((userData) => {
        req.session.user = {user: true, id: userData.id, firstname: userData.firstname, lastname: userData.lastname}
        res.json({success: true, userData})
    })
    .catch((error) => {
        if(error.code == 23505) {
            res.json({error: 23505 });
        } else {
            res.json({error: 1007})
        }
    })
})



router.post('/api/login', (req, res, next) => {
    const {email, password} = req.body
    redis.getInvalidAttempts(email)
    .then(invalidAttempts => {
        if (invalidAttempts < 3) {
        // If the number of invalid attempts is less then 3, the  credentials
        // are sent to the database and checked.
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
                    throw `Error in retrieving user's address information`
                })
            })
            .catch((error) => {
                redis.invalidLogin(email, invalidAttempts)
                return invalidAttempts < 2 ? res.json({ error: 1003 }) :
                res.json({ error: 1004, blocked: 90})
            })
    } else {
        redis.invalidLogin(email, invalidAttempts)
            // The duration for which the account is blocked is sent back.
            // N.B this calculation uses the number of invalid attemps before
            // the current one
            const blocked = Math.pow(2, invalidAttempts-2) * 90
            return res.json({ error: 1004, blocked })
        }
    })
})

router.get('/api/user', (req, res, next) => {
    const {id} = req.session.user
    getUserInformation(id)
    .then((userData) => {
        res.json({success: true, userData})
    })
    .catch((error) => {
        next('error retriving user information')
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
            throw 'Error in adding profile picture to the database'
        })
    } else {
        res.json({ success: false, imageFormatInvalid: true });
    }
});


router.post('/api/updateUserInfo', (req, res) => {
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
        usersData = usersData.filter(user => {
            return user.id !== req.session.user.id
        })
        res.json({ success: true, usersData })
    })
    .catch((error) => {
        console.log(error);
    })
})


module.exports = router
