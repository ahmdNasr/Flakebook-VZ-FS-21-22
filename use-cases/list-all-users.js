const UserDAO = require("../db-access/user-dao.js")

async function listAllUsers() {
    const usersArray = await UserDAO.getAllUsers()
    // nur username + image anzeige // keine email mehr.... (zb weil email ist sensetive...)
    const usersView = usersArray.map(user => ({ username: user.username, image: user.image }))
    return usersView
}

module.exports = listAllUsers