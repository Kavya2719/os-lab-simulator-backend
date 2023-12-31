import mongoose from "mongoose";
import { config } from 'dotenv';
config()

const db_url = process.env.DB_TOKEN

export default async () => {
    try {
        if(mongoose.connection.readyState === 1){
            return mongoose.connection;
        }

        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const db = await mongoose.connect(db_url, connectionParams);
        console.log("Connected to Database!");

        return db.connection;
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to Database!");
    }
};