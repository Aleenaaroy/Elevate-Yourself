import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
dotenv.config();


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Elevate';

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
