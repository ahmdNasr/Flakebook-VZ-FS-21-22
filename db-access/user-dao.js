const { _getDb } = require("./_getDb")

function getAllUsers() {
    return _getDb()
    .then((db) => {
        const frageDieDatenbankPromiseNachAllenUsern = db.collection('users')
        .find() // no find query because want all
        .toArray() // turn FindCursor into array to get data
    
        return frageDieDatenbankPromiseNachAllenUsern
    })
}

/*
return db.collection('users')
    .find() // no find query because want all
    .toArray() // turn FindCursor into array to get data
*/

function getUserByUsername (username) {
    return _getDb()
    .then((db) => db.collection('users').findOne({ username }))
}

function userNameOrEmailExists(username, email) {
    return _getDb()
    .then((db) => {
        return db.collection('users')
        .findOne({ 
            $or: [
                { username: username },
                { email:  email },
            ]
        })
    })
}

function createNewUser (user) {
    return _getDb()
    .then((db) => {
        return db.collection('users')
        .insertOne(user)
    })
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    userNameOrEmailExists,
    createNewUser
}