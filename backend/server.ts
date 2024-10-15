//backend\server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from "./src/infrastructure/config/dbConnection";
import authRoutes from './src/infrastructure/routes/AuthRoutes';
import adminRoutes from './src/infrastructure/routes/AdminRoutes';


const app = express();

const corsOptions = {  
    origin: ["http://localhost:3001","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

connectToDatabase();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
