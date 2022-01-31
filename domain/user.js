module.exports = function makeUser({ username, email, image, _id }) {
    if(!username || typeof username !== "string" || username.length === 0) {
        throw new Error("Username must be defined!")
    }

    if(!email || !email.includes("@")) {
        throw new Error("Email of user must be valid!")
    }

    return {
        username,
        email,
        image,
        _id
    }
}