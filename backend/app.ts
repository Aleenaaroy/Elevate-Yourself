import express from 'express';
import cors from 'cors';
import authRoutes from './src/infrastructure/routes/AuthRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

export default app;
