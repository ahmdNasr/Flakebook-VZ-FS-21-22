const { getUserByUsername } = require("../db-access/user-dao")

function listOneUser({ username }) {
    if(!username) {
        throw new Error("Username must be defined when you list one user.")
    }

    return getUserByUsername(username)
}

module.exports = listOneUser