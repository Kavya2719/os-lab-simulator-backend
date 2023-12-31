import mongoose from "mongoose";
import connectDatabase from "../connectDatabase.js";

const db = await connectDatabase()
const userDB = db.useDb('Users')

const UserSchema = mongoose.Schema({
    userName: String,
    inputDatas: Array
},{
    versionKey: false // Disable versioning
});

export default userDB.model("users", UserSchema);