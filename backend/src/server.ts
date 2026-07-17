import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();


//Middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

//Test Route
app.get('/', (req, res) => {
    res.send('Real Fake Store API is running!')
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


export default app;