//backend\app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './src/infrastructure/routes/AuthRoutes';

const app = express();

const corsOptions = {
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

export default app;
