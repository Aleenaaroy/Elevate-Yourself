//backend\server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from "./src/infrastructure/config/dbConnection";
import authRoutes from './src/infrastructure/routes/AuthRoutes';

const app = express();

const corsOptions = {
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);

// Database connection
connectToDatabase();

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
