// Setup Connection to Redis Server ••••••••••••••••••••••••••••••••••••••••••••
// The following command sets up a client. Different details are passed to
// establish the connection to the redis server, depending on whether it is in
// development or production environment.
const client = require("redis").createClient(process.env.REDIS_URL || {
    host: 'localhost',
    port: 6379
})
// Logging errors to the console
client.on("error", console.log)
// Export Promisified Queriies •••••••••••••••••••••••••••••••••••••••••••••••••
// Those promisified versions of Redis queries are imported in redis.js
module.exports = { get, setex }

// ========================================================================== \\
// ======================= Promisified Redis Queries ======================== \\
// The functions below simply create promisified versions of the usual redis
// queries. If information is returned, it is parsed.

// get •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => { (err) ? reject(err) : resolve(JSON.parse(data)) })
    })
}

// setex •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
function setex(key, ex, value) {
    return new Promise((resolve, reject) => {
        client.setex(key, ex, value, (err, data) => { (err) ? reject(err) : resolve(data) })
    })
}
