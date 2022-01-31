const express = require('express')
const formidable = require('formidable')
const dotenv = require("dotenv")

// import services/use-cases ....
const listAllUsersService = require('./use-cases/list-all-users.js')
const listOneUserService = require('./use-cases/list-one-user.js')
const createNewUserService = require('./use-cases/create-new-user.js')

dotenv.config()

// Express
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', function getAllUsersController(req, res) {     
    listAllUsersService()
    .then((userArray) => {
        console.log(userArray)
        //console.log("versprechen Zeile 27", allUsersPromise)
        res.render('pages/home', { userArray })
    })
})

app.get('/user/:username', function getUserController(req, res) {
    const username = req.params.username
    
    listOneUserService({ username })
    .then((user) => {
        res.render('pages/user', { user })
    })
})

app.post('/user', function postUserController(req, res) {
    //input auslesen mit formidable
    const form = formidable({ multiples: true, uploadDir: 'public/uploads' });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.render('pages/notFound')
            return;
        }

        const userInfo = {
            username: fields.username,
            email: fields.email,
            image: files.image.newFilename
        }

        //username und email soll unique sein
        createNewUserService(userInfo)
        .then(() => res.redirect('/')) //hier wird nur auf die Route verwiesen, Daten müssen nicht mit-> werden in get('/') übergeben
        .catch((err) => {
            console.log("about to render errorPage", err);
            res.render('pages/errorPage')
        })
    });
})

app.use(function notFoundController(_, res) {
    res.render("pages/notFound")
})

const PORT = process.env.PORT || 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))