const { _getDb } = require("./_getDb")

// neuer post
async function addPost(postInfo) {
    const db = await _getDb()
    return await db.collections("posts").insert(postInfo)
}

// posts collection
// post document := { ..., comments: [{ commentText: "Cooler Post", userId: 1983779111901, timestamp: 16039390003 }] }
async function addCommentToPost(postId, commentInfo) {
    const db = await _getDb()
    return await db.collections("posts").updateOne(
        { _id: postId },
        { $push: { comments: commentInfo } }
    )
}

module.exports = {
    addPost,
    addCommentToPost
}