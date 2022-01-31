const { _getDb } = require("./_getDb")

// neuer post
function addPost(postInfo) {
    return _getDb().then((db) => {
        return db.collections("posts").insert(postInfo)
    } )
}

// posts collection
// post document := { ..., comments: [{ commentText: "Cooler Post", userId: 1983779111901, timestamp: 16039390003 }] }
function addCommentToPost(postId, commentInfo) {
    return _getDb().then((db) => db.collections("posts").updateOne(
        { _id: postId },
        { $push: { comments: commentInfo } }
    ))
}

module.exports = {
    addPost,
    addCommentToPost
}