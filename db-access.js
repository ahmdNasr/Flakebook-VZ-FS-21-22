const { MongoClient } = require("mongodb")

let db; // Design Pattern = Singleton

function connectToDB() {
    if(typeof db === "undefined") {
        const url = process.env.DB_URL;
        const client = new MongoClient(url)

        client
        .connect()
        .then((connected_client) => {
            db = connected_client.db('myFirstDatabase');
        })
    }
}

function getAllUsers() {
    return db.collection('users')
    .find() // no find query because want all
    .toArray() // turn FindCursor into array to get data
}

function getUserByUsername (username) {
    return db.collection('users')
    .findOne({ username })
}

function userNameOrEmailExists(username, email) {
    return db.collection('users')
    .findOne({ 
        $or: [
            { username: username },
            { email:  email },
        ]
    })
}

function createNewUser (user) {
    return db.collection('users')
    .insertOne(user)
}

module.exports = {
    connectToDB,
    getAllUsers,
    getUserByUsername,
    userNameOrEmailExists,
    createNewUser
}