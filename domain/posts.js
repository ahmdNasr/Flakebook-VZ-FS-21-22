module.exports = function makePost({
    userId,
    postContent,
    comments,
    createdOnTimeStamp,
    _id
}) {
    if(!userId || typeof userId !== "string" || userId.length !== 24) {
        throw new Error("useriId must be a valid string when creating a post!")
    }

    if(!postContent || typeof postContent !== "string" || postContent.length === 0) {
        throw new Error("postContent must be defined!")
    }

    const _comments = comments && Array.isArray(comments) 
        ? comments
        : []

    const _createdOnTimeStamp = typeof createdOnTimeStamp === "number"
        ? createdOnTimeStamp // wenn es einen timestmap gibt, dann nimm den einfach
        : Date.now() // ansonsten.... erstelle einen für JETZT, weil das ein neuer Post ist....

    return {
        userId,         // garantiert eine vernünfitge id (weil string + 24 charachtere)
        postContent,    // garantiert ein string mit inhalt
        comments: _comments, // garantiert ein array
        createdOnTimeStamp: _createdOnTimeStamp, // garantiert eine zahl!
        _id
    }
}

/*
Warum machen wir makePost und make User usw ???

Antwort:
        // stell dir vor wir greifen auf postInfo direkt zu...
        // es könnten beim zugriff auf .comments als Array folgende fehler entstehn:
postInfo.comments.push()
        //        ^ cannot read property of undefined (reading push)
        //        ^ push is not a function

        // wenn wir jedoch ein post Object erstellen...
        // dann haben wir garantien (siehe oben) da das postInfo durch makePost zu einem "bestätigten" post wurde
const post = makePost(postInfo)

post.comments.push() // !garantiert, dass die oberen fehler NICHT entstehen können!
posts-dao.addPost(post) // garantiert ein sinnvoller post der hier in die Datenbank kommt!

*/