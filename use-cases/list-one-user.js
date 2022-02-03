const { getUserByUsername } = require("../db-access/user-dao")

async function listOneUser({ username }) {
    if(!username) {
        throw new Error("Username must be defined when you list one user.")
    }

    const user = await getUserByUsername(username)
    return user
}

module.exports = listOneUser