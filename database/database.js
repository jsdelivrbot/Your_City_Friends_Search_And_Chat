const spicedPg = require('spiced-pg'),
      dbUrl = process.env.DATABASE_URL ||
      `postgres:${require("../secret.json").username}:${require("../secret.json").password}psql@localhost:5432/roadtripdb`,
      db = spicedPg(dbUrl),
      {hashPassword, checkPassword} = require('./hashpassword'),
      defaultImageMale = '/profile-default-male.png',
      defaultImageFemale = '/profile-default-female.jpg',
      linkToAmazon = require('../config.json').s3Url,
      _ = require('lodash')

exports.registerNewUser = function(firstname, lastname, email, password, gender) {

  return hashPassword(password).then((hashedPassword) => {
      let image = gender === 'male' ||  gender === 'Male' ? defaultImageMale : defaultImageFemale

      const query = `INSERT INTO users (firstname, lastname, email_address, password, gender, image)
                     VALUES ($1, $2, $3, $4, $5, '${image}') RETURNING id, firstname, lastname, gender`
      return db.query(query, [firstname, lastname, email, hashedPassword, gender])
      .then((results) => {
          return results.rows[0]
      });
  });
};

exports.verifyUserCredential = function(email, password) {
    const query = `SELECT password, id, firstname, lastname, password as hashedPassword, image, gender FROM users WHERE email_address = ($1)`

    return db.query(query, [email])
    .then((userData) => {
        return {
            id: userData.rows[0].id,
            firstname: userData.rows[0].firstname,
            lastname: userData.rows[0].lastname,
            hashedPassword: userData.rows[0].password,
            image: userData.rows[0].image,
            gender: userData.rows[0].gender
        }
    })
    .then(({id, firstname, lastname, hashedPassword, image, gender}) => {
        return checkPassword(password, hashedPassword)
        .then((doesMatch) => {
            if(!doesMatch) {
                throw 'Passwords do not match!'
            }
            return {id, firstname, lastname, image, gender}

        })
    })
}

exports.lookForAddressInformation = function(id) {
    const query = `SELECT users.id, city, lat, lng
                   FROM users
                   INNER JOIN user_profiles
                   ON (users.id = user_profiles.user_id)
                   WHERE (users.id = ($1))`
    return db.query(query, [id])
    .then((addressInfo) => {
        return {
            city: addressInfo.rows[0].city,
            lat: addressInfo.rows[0].lat,
            lng: addressInfo.rows[0].lng
        }
    })
}


exports.getUserInformation = function(id) {
    query = `SELECT id, firstname, lastname, image, gender FROM users WHERE id = $1`
    secondquery = `SELECT bio, age, city, lat, lng FROM user_profiles WHERE user_id = $1`

    return db.query(query, [id])
    .then((userData) => {
        return db.query(secondquery, [id])
        .then((profileData) => {
            if(!profileData.rows[0]) {
                return userData.rows[0]
            } else {
                return {
                    id: userData.rows[0].id,
                    firstname: userData.rows[0].firstname,
                    lastname: userData.rows[0].lastname,
                    image: userData.rows[0].image,
                    gender: userData.rows[0].gender,
                    bio: profileData.rows[0].bio,
                    age: profileData.rows[0].age,
                    city: profileData.rows[0].city,
                    lat: profileData.rows[0].lat,
                    lng: profileData.rows[0].lng
                }
            }

        })
        // return profileData.rows[0]
    })
}

exports.addProfilePicture = function(image, id) {
    const query = `UPDATE users
                   SET image = $1
                   WHERE id=($2)
                   RETURNING id, firstname, lastname, gender, image`

    const imageLinked = 'https://s3.amazonaws.com/alevoidimageboard/' + image
    return db.query(query, [imageLinked, id])
    .then((results) => {
        return results.rows[0];
    })
}

exports.updateUserPersonalInfo = function(id, age, bio, city, lat, lng) {
    const query = `INSERT INTO user_profiles
                   (user_id, age, bio, city, lat, lng)
                   VALUES ($1, $2, $3, $4, $5, $6)
                   ON CONFLICT (user_id) DO UPDATE
                   SET age = $2, bio = $3, city = $4, lat = $5, lng = $6
                   WHERE user_profiles.user_id = $1
                   RETURNING age, bio, city, lat, lng`

    return db.query(query, [id, age || null, bio || null, city || null, lat || null, lng || null])
    .then((userData) => {
        return {
            id: id,
            age: userData.rows[0].age,
            bio: userData.rows[0].bio,
            city: userData.rows[0].city,
            lat: userData.rows[0].lat,
            lng: userData.rows[0].lng
        }
    })
}

exports.findPeopleFromSameCity = function(city) {
    const query = `SELECT users.id, firstname, lastname, age, image, city, lat, lng
                   FROM users
                   INNER JOIN user_profiles
                   ON (city =  $1)
                   WHERE (users.id = user_profiles.user_id)`

    return db.query(query, [city])
    .then((userData) => {
        if(typeof userData === 'undefined') {
            return 'No friends available here'
        }
        return userData.rows
    })
}

exports.loadPrivateMasseges = function(userId, recipientId) {
    const query = `SELECT sender_id, message, created_at from chat
                   WHERE (sender_id = ($1) AND recipient_id = ($2))
                   OR (sender_id = ($2) AND recipient_id = ($1))
                   ORDER BY created_at DESC
                   LIMIT 12`

    return db.query(query, [userId, recipientId])
    .then((dbPrivMsgs) => {
        const privMsgs = dbPrivMsgs.rows.map(privMsg => {
            return {
                newMessage: privMsg.sender_id == userId,
                message: privMsg.message,
                time: privMsg.created_at
            }
        })

        return {
            privMsgs, recipientId
        }
    })
}

exports.addPrivMsgToDb = function(message, senderId, recipientId) {
    const query = `INSERT INTO chat (message, sender_id, recipient_id) VALUES ($1, $2, $3) RETURNING created_at`

    return db.query(query, [message, senderId, recipientId])
    .then((dbPrivMsg) => {

        const user_message = {
            newMessage: true,
            message: message,
            time: dbPrivMsg.rows[0].created_at
        }
        const friend_message = {
            newMessage: false,
            message: message,
            time: dbPrivMsg.rows[0].created_at
        }
        return {
            userMessage: { recipientId: recipientId, message: user_message },
            friendMessage: { recipientId: senderId, message: friend_message }
        }
    });
}

exports.loadAllPrivMsgs = function(loggedInUser) {
    const query = `SELECT sender_id, recipient_id from chat
                   WHERE (sender_id = ($1))
                   OR (recipient_id = ($1))
                   ORDER BY created_at DESC`

    const scnQuery = `SELECT id, firstname, lastname
                      from users
                      WHERE id = ANY($1)`

    return db.query(query, [loggedInUser])
    .then((allMsgs) => {

    //gettin an array of all the user's ids the loggedUser interacted via chat:
    let messages = allMsgs.rows.map(msgs => {
        if(msgs.sender_id !== loggedInUser) {
            let sender = msgs.sender_id
            return {id: sender}
        } else if(msgs.recipient_id !== loggedInUser) {
            let recipient = msgs.recipient_id
            return {id: recipient}
        }
    }).filter(msg => {
        return msg !== undefined
    })

    messages = _.uniq(messages, (e) => {
        return e.id
    }).map(msg => { return msg.id })

    return db.query(scnQuery, [messages])
    .then((listOfMsgs) => {
        return listOfMsgs.rows
    })
    })
}
