const makeUser = require("../domain/user.js")
const UserDAO = require("../db-access/user-dao.js")

function createNewUserService(userInfo) {
    return new Promise((resolve, reject) => {
        const user = makeUser(userInfo) // validate input using makeUser // normalerweise macht das die facade...

        UserDAO.userNameOrEmailExists(user.username, user.email)
        .then((foundUser) => {
            if (foundUser) {
                reject()
            } else {
                UserDAO.createNewUser(user)
                .then((createdUser) => resolve(createdUser))
            }
        }).catch((err) => console.log(err))
    })
}

module.exports = createNewUserService