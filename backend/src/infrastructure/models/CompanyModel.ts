// backend\src\infrastructure\models\CompanyModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Company } from '../../domain/entities/Company';

// Create an intersection type of Mongoose Document and the Company interface
export interface CompanyDocument extends Document, Omit<Company, 'id'> {
  _id: string; // Mongoose's _id field, if required
}

const savedPostSchema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
  addedAt: { type: Date, default: Date.now }
});

const followerSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' }
});

const followingCompanySchema = new Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' }
});

const companySchema = new Schema<CompanyDocument>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /[a-zA-Z]/.test(value),
      message: 'Invalid Name entry'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  phone: {
    type: Number,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Candidate', 'Company']
  },
  password: {
    type: String,
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  verify: {
    type: Boolean,
    default: false
  },
  location: { type: String },
  headline: { type: String },
  profileImage: {
    type: String,
    default: 'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png'
  },
  savedPosts: [savedPostSchema],
  followers: [followerSchema],
  followingCompanies: [followingCompanySchema],
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const companyModel = mongoose.model<CompanyDocument>('companies', companySchema);
export default companyModel;
