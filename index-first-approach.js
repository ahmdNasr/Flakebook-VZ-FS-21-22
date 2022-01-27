const express = require('express')
const formidable = require('formidable')
const dotenv = require("dotenv")
const { MongoClient } = require("mongodb")

dotenv.config()

// Mongodb
const url = process.env.DB_URL;
const client = new MongoClient(url)

// Express
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

client
.connect()
.then((connected_client) => {
    const db = connected_client.db('myFirstDatabase');

    app.get('/', (req, res) => {
        db.collection('users')
        .find()
        .toArray()
        .then((userArray) => {
            console.log(userArray)
            res.render('pages/home', { userArray })
        })
    })
    
    app.get('/user/:username', (req, res) => {
        const username = req.params.username
        console.log(username)

        db.collection('users')
        .findOne({ username })
        .then((user) => {
            res.render('pages/user', { user })
        })
    })
    
    app.post('/user', (req, res) => {
        //input auslesen mit formidable
        const form = formidable({ multiples: true, uploadDir: 'public/uploads' });
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.render('pages/notFound')
                return;
            }
            //User anlegen, 
            const user = {
                username: fields.username,
                email: fields.email,
                image: files.image.newFilename
            }
            //username und email soll unique sein
            db.collection('users')
            .findOne({ 
                $or: [
                    { username: fields.username },
                    { email:  fields.email },
                ]
            }).then((foundUser) => {
                if (foundUser) {
                    res.render('pages/errorPage')
                } else {
                    db.collection('users')
                    .insertOne(user)
                    .then(() => {
                        res.redirect('/') //hier wird nur auf die Route verwiesen, Daten müssen nicht mit-> werden in get('/') übergeben
                    })
                }
            })

        });
    })
})
.catch((err) => console.log("error configuring routes... failed to connect to database: ", err))
.finally(() => {
    app.use((_, res) => {
        res.render("pages/notFound")
    })
})

const PORT = process.env.PORT || 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))






/* TODO:
-->USER-Seite:
pages: Community start page -> User anlegen , Alle User in der Community,
         UserProfile:ein user
         userInfo: Vor & Nachname, images, email, Nutzername
-->SERVER-Seite:
startpage liefern get('/')
single user get('/user/:id')

Formular auf den Pages:
->empfängt Info, via post('/user')

Error-Page (/*)

Email-verifizierung
*/

/*
DB-Queries

Users:
    username: string,
    email: string,
    image: string,

Requirements:
    [DONE] * Get All Users 
    [DONE] * Get One User By Usernamne
    [DONE] * Create A New User (unique username and unique email)

*/
