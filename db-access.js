const { MongoClient } = require("mongodb")

let _db; // Design Pattern = Singleton

function _getDb() {   // "resolve",   "reject"
    return new Promise((resolveDB, rejectWithErr) => {
        if(_db) {
            // hier ist die datenbank verbindung schon aufrecht
            // ich kann direkt die Promise von oben resolven...
            // ich muss keine weitere verbindung aufbauen...
            resolveDB(_db);
        } else {
            const url = process.env.DB_URL;
            const client = new MongoClient(url)
    
            client
            .connect()
            .then((connected_client) => {
                _db = connected_client.db('myFirstDatabase');
                resolveDB(_db)
            })
            .catch((err) => rejectWithErr(err))
        }
    })
}

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