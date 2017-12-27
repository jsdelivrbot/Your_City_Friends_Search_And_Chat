// Promisified versions of Redis functions •••••••••••••••••••••••••••••••••••••
// redis-promisified.js sets up a client and establishes the connection to the
// redis server. It then exports promisified versions of redis commands.
const redisPromise = require("./redis-promisified")
// Export Query Functions ••••••••••••••••••••••••••••••••••••••••••••••••••••••
module.exports = { getInvalidAttempts, invalidLogin }

// ========================================================================== \\
// ============================= Redis Queries ============================== \\

// Get Invalid Attempts ••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// This function simply returns the number of consecutive invalid login
// attempts that were made for a given email address
function getInvalidAttempts(email) {
    return redisPromise.get(email)
}

// Invalid Login •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// This function updates the number of invalid login attempts for a given
// email. The duration for which this information is saved depends on the
// number of invalid logins. The first 2 invalid attemtpts are kept in memory
// for 60 seconds, after a third invalid attempt within that time, the account // will be blocked for 90 seconds, this time is doubled for each subsequent
// invalid attempt before the account is unblocked: 180, 360, etc.
function invalidLogin(email, invalidAttempts) {
    // N.B this calculation uses the number of invalid attemps before the
    // current one
    const timeToReset = invalidAttempts < 3 ? 60 : Math.pow(2, invalidAttempts-2) * 90
    return redisPromise.setex(email, timeToReset, invalidAttempts + 1)
}
