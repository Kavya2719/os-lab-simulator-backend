import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import InputData from './routes/InputData.js';
import connectDatabase from './connectDatabase.js';

config();
connectDatabase();

const port = process.env.API_PORT || 8000;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    preflightContinue: false,
}))


app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(port, () => {
	console.log(`Listening to Port ${port}.`);
});


app.use('/', InputData)

export { app };