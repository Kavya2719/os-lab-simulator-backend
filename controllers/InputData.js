import User from '../models/User.js';
import { fetchByUsername } from './User.js';
import mongoose from 'mongoose';


const saveInputData = async (req, res) => {
    try{
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established.');
        }
        
        const { userName } = req.params
        if(!userName) 
            return res.status(400).send({ msg: 'User name is required!' })

        let user = await fetchByUsername(userName)
        if(!user){
            user = new User({ userName, inputDatas: [] })
        }

        const { title, description, data } = req.body
        const newInputData = { title, description, data }
        
        const isAlreadyPresent = user.inputDatas.some(inputData => {
            if(!inputData) return false
            return JSON.stringify(inputData) === JSON.stringify(newInputData)
        });

        if(isAlreadyPresent){
            return res.status(200).send({ msg: 'Input data already exists!' })
        }
        user.inputDatas.push(newInputData)
        
        await user.save()
        res.status(200).send({ msg: 'Data Saved Successfully!' })
    }catch(error){
        console.log('Error while saving input data: ', error)
        res.status(500).send({ msg: 'Error while saving input data: ' + error,  })
    }
}


const updateInputData = async (req, res) => {
    try{
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established.');
        }
        
        const { userName, index } = req.params
        if(!userName) 
            return res.status(400).send({ msg: 'User name is required!' })

        let user = await fetchByUsername(userName)
        if(!user){
            return res.status(200).send({ msg: 'No Saved Inputs Found!' })
        }

        if(index < 0 || index >= user.inputDatas.length)
            return res.status(400).send({ msg: 'Invalid index!' })

        const { title, description, data } = req.body
        const newInputData = { title, description, data }

        user.inputDatas[index] = newInputData
        await user.save()
        
        res.status(200).send({ msg: 'Data Updated Successfully!' })
    } catch(error){
        console.log('Error while updating input data: ', error)
        res.status(500).send({ msg: 'Error while updating input data: ' + error  })
    }
}


const deleteInputData = async (req, res) => {
    try{
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established.');
        }
        
        const { userName, index } = req.params
        if(!userName) 
            return res.status(400).send({ msg: 'User name is required!' })

        let user = await fetchByUsername(userName)
        if(!user){
            return res.status(200).send({ msg: 'No Saved Inputs Found!' })
        }

        if(index < 0 || index >= user.inputDatas.length)
            return res.status(400).send({ msg: 'Invalid index!' })

        user.inputDatas.splice(index, 1)
        await user.save()

        res.status(200).send({ msg: 'Data Deleted Successfully!' })
    } catch(error){
        console.log('Error while deleting input data: ', error)
        res.status(500).send({ msg: 'Error while deleting input data: ' + error  })
    }
}


const getAllSavedInputDatas = async (req, res) => {
    try{
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established.');
        }
        
        const { userName } = req.params
        if(!userName) 
            return res.status(400).send({ msg: 'User name is required!' })

        const user = await fetchByUsername(userName)
        if(!user){
            return res.status(200).send({ msg: 'No Saved Inputs Found!' })
        }

        res.status(200).send({ inputDatas: user.inputDatas, msg: 'Data Fetched Successfully!' })
    } catch(error){
        console.log('Error while fetching all input data: ', error)
        res.status(500).send({ msg: 'Error while fetching all input data: ' + error  })
    }
}


export default { saveInputData, getAllSavedInputDatas, updateInputData, deleteInputData };