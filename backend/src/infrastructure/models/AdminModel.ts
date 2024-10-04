// backend\src\infrastructure\models\AdminModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Admin } from '../../domain/entities/Admin';

// Create an intersection type of Mongoose Document and the Admin interface
export interface AdminDocument extends Document, Omit<Admin, 'id'> {
  _id: string; // Mongoose's _id field, if required
}

const adminSchema = new Schema<AdminDocument>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  password: {
    type: String,
    required: true
  }
});

const adminModel = mongoose.model<AdminDocument>('admins', adminSchema);
export default adminModel;
