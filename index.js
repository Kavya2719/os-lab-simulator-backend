import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import { config } from 'dotenv';

config();

const API_PORT = process.env.API_PORT || 8000;
const app = express()

const db_token = process.env.DB_TOKEN;

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(API_PORT, () => {
    console.log(`App listening on port ${API_PORT}`)
})