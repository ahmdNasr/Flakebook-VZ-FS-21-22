const makeUser = require("../domain/user.js")
const { userNameOrEmailExists, createNewUser } = require("../db-access/user-dao.js")

async function createNewUserService(userInfo) {
    const user = makeUser(userInfo) // validate input using makeUser // normalerweise macht das die facade...

    const foundUser = await userNameOrEmailExists(user.username, user.email)   
    if (foundUser) {
        throw new Error("No User Found")
    } else {
        const createdUser = await createNewUser(user)
        return createdUser
    }
}

module.exports = createNewUserService