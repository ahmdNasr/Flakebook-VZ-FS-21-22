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

module.exports = { _getDb }