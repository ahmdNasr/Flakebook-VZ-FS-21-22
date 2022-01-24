const express = require('express')
const app = express()
const formidable = require('formidable')

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
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
    res.render('pages/home', { userArray })
})
app.get('/user/:username', (req, res) => {
    const username = req.params.username
    console.log(username)
    //nach user filtern
    const filteredUser = userArray.filter(user => user.username === username
    ) //statt filter auch find möglich
    /* find geht nur soweit bis er was gefunden hat, filter geht durch das komplette Array */
    console.log(filteredUser)
    res.render('pages/user', { user: filteredUser[0] })
})

//leeres UserArray für const user-Objekt
const userArray = []

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
        const foundUser = userArray.find(user =>
            user.username === fields.username ||
            user.email === fields.email
        )

        if (foundUser) {
            res.render('pages/errorPage')
        } else {
            userArray.push(user)
            /* res.json(userArray); */
            res.redirect('/') //hier wird nur auf die Route verwiesen, Daten müssen nicht mit-> werden in get('/') übergeben
        }
    });
})
//Email-Verifizierung

app.use((_, res) => {
    res.render("pages/notFound")
})

const PORT = process.env.PORT || 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))