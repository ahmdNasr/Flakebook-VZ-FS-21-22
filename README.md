
# Layerd Architecture (Schichten Architektur) 

* Controller (Routen, wo die daten sind im http packet, zb: ist die email im header, params, query, body, cookies ???)

* Facade (Data Inuput-Output Validation & Specification Layer)
    * Erinnere dich an: express-validator, das ist genau für diesen zweck
    * Commands (input an die API) -> (zb: LoginFacad sagt LoginCommand muss so ausschauen: { email: "string vom type email", password: "string, mind 8 charactere, mind 1 zeichen, mind 1ne zahl" })
    * Views (output der API) <- (zb: LoginResultView sagt dass nach dem login bekommst du von der API folgendes: { token: "___login_token___" })

* Service (Business Logic/Use-Cases: Login, Logout, ListUsers, FollowAFriend, Register, Unfollow, PostComment, UploadImgae, RegisterDevice, AddMenu)

* Domain Layer (Modell/Abbildung der Daten)

* Db-Access (BSP: User-DAO: findByEmail, findByUsername, followOtherUser, userExists, insertNewUser, ...)