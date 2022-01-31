const UserDAO = require("../db-access/user-dao.js")

function listAllUsers() {
    return new Promise((resolve) => {
        UserDAO.getAllUsers().then((usersArray) => {
            // nur username + image anzeige // keine email mehr.... (zb weil email ist sensetive...)
            const usersView = usersArray.map(user => ({ username: user.username, image: user.image }))
            resolve(usersView)
        })
    })
}

module.exports = listAllUsers