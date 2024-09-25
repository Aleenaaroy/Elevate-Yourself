import express from 'express';
import cors from 'cors';
import authRoutes from './src/infrastructure/routes/AuthRoutes';

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    methods: 'GET,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

export default app;
