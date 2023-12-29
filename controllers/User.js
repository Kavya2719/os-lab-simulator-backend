import User from '../models/User.js';
import mongoose from 'mongoose';

const fetchByUsername = async (userName) => {
    try{
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established.');
        }

        const user = await User.findOne({ userName })

        if(!user) return null
        return user;
    }catch(error){
        console.log('Error while fetching user: ', error)
    }
}

export { fetchByUsername }