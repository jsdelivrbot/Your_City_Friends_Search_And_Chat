# Your City's Friends

* ###  Overview

Your City's Friends is a friends search engine based on the user's current location.
Users can check the users that are currently registered from their city, check their photos, age, info, and decide eventually to interact with them. Users can also manage their active chats from the dedicated panel.

The main technologies used:

* React JS
* Redux
* Redis (noSQL)
* Postgres (SQL)
* Node
* Socket.io
* AWS S3

* ### Description

1. Login / Registration:

Both login and registration use redux-forms that create, in my opinion, smart, elegant and clear code.

- All possible errors are handled between server and client side (like the case an e-mail has been already registered, or the case   one field is missing or doesn't match the entry requirements)

- The passwords are:

    .protected against bruteforce attacks: if users try to log in with bad credentials more than 3 times, then a timeout won't allow to login anymore until the "punish time" has ended. The "punish time" will double every time user tries to login again!
    ![](https://github.com/Alevoid/FindfriendsFromYourCity/blob/master/public/README-gif/redis_wrong_pwd.gif)

    .hashed and salted before being saved into the database;

    .strong: each password needs to be at least 8 characters long and to have at least: 1 uppercase alphabetical character, one lowercase alphabetical character, one numeric character, one special character (?,@,#..);

- All forms include CSRF protection.

2. Once User is registered/logged in:

After registration/login user can customize his profile (adding a profile picture or saying something about himself) and add his personal information. (I will implement the possibility to add more picture besides the main one)

![](https://github.com/Alevoid/FindfriendsFromYourCity/blob/master/public/README-gif/add_personal_info.gif)

3. Your City's Friends:
Once the current location is detected, user can see the other registered users living in the same city and, looking at their picture and info he can decide to interact with them.

If the user is moving to another location (for instance, for holiday) it is just enough for him to switch the location and look for friends from the new city. Once the user find somebody he likes he can start interacting with him/her

![](https://github.com/Alevoid/FindfriendsFromYourCity/blob/master/public/README-gif/check_users_from_same_city.gif)

![](https://github.com/Alevoid/FindfriendsFromYourCity/blob/master/public/README-gif/check_users_and_chat.gif)

4. Chats component

At each given time the user has the chance to manage all his active chats and have multiple private conversation at ones. He can switch from one to another thanks to socket.io, a Javascript library that enables real-time, two-way communication between clients and servers using WebSockets.

![](https://github.com/Alevoid/FindfriendsFromYourCity/blob/master/public/README-gif/going_to_chat.gif)
