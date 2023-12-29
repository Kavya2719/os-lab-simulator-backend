import mongoose from "mongoose";
import { config } from 'dotenv';
config()

const db_url = process.env.DB_TOKEN

export default async () => {
    try{
        await mongoose.connect(db_url)
        console.log('Database Connected Successfully!')
    } catch(error){
        console.log('Error Connecting Database!', error)
    }
}