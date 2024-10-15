// backend\src\infrastructure\models\AdminModel.ts

import mongoose, { Document, Schema } from 'mongoose';
import { Admin } from '../../domain/entities/Admin';

export interface AdminDocument extends Document, Omit<Admin, 'id'> {
  _id: string; 
}
// Define the Admin schema
const adminSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
    },
});



// Create the Mongoose model
const AdminModel = mongoose.model<AdminDocument>('Admin', adminSchema);

export default AdminModel;

