import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Test Route
app.get('/', (req, res) => {
    res.send('Real Fake Store API is running!')
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});