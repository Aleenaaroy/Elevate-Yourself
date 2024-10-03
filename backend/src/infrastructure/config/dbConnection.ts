//backend\src\infrastructure\config\dbConnection.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
        process.exit(1); 
    }
};
