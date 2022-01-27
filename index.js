const express = require('express')
const formidable = require('formidable')
const dotenv = require("dotenv")

const {
    connectToDB,
    getAllUsers,
    getUserByUsername,
    userNameOrEmailExists,
    createNewUser
} = require("./db-access.js")

dotenv.config()
connectToDB()

// Express
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {     
    getAllUsers()
    .then((userArray) => {
        res.render('pages/home', { userArray })
    })
})

app.get('/user/:username', (req, res) => {
    const username = req.params.username
    
    getUserByUsername(username)
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
        userNameOrEmailExists(user.username, user.email)
        .then((foundUser) => {
            if (foundUser) {
                res.render('pages/errorPage')
            } else {
                createNewUser(user)
                .then(() => {
                    res.redirect('/') //hier wird nur auf die Route verwiesen, Daten müssen nicht mit-> werden in get('/') übergeben
                })
            }
        })
    });
})

app.use((_, res) => {
    res.render("pages/notFound")
})

const PORT = process.env.PORT || 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))