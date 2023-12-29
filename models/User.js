import mongoose from "mongoose";

const db = mongoose.connection
const userDB = db.useDb('Users')

const UserSchema = mongoose.Schema({
    userName: String,
    inputDatas: Array
},{
    versionKey: false // Disable versioning
});

export default userDB.model("users", UserSchema);