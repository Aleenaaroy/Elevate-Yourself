// backend\src\infrastructure\models\CompanyModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Company } from '../../domain/entities/Company';

export interface CompanyDocument extends Document, Omit<Company, 'id'> {
  _id: string;
}

const companySchema = new Schema<CompanyDocument>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /[a-zA-Z]/.test(value),
      message: 'Invalid Name entry',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  phone: {
    type: Number,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Company'],
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  location: { type: String },
  headline: { type: String },
  profileImage: {
    type: String,
    default: 'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png',
  },
  savedPosts: [
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  followers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' },
    },
  ],
  followingCompanies: [
    {
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' },
    },
  ],
  createdOn: { type: Date, default: Date.now },
});

const companyModel = mongoose.model<CompanyDocument>('companies', companySchema);
export default companyModel;
