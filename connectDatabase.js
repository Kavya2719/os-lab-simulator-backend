import mongoose from "mongoose";
import { config } from 'dotenv';
config()

const db_url = process.env.DB_TOKEN

export default async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(db_url, connectionParams);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};