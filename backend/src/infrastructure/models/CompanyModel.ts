// backend\src\infrastructure\models\CompanyModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Company } from '../../domain/entities/Company';

interface CompanyDocument extends Omit<Company, 'id'>, Document {}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'Company' },
    isBlocked: { type: Boolean, default: false },
    location: String,
    industry: String,
    profileImage: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png' },
    companySize: Number,
    website: String,
    otp: { type: String },
    otpExpires: { type: Date },

});

export const CompanyModel = mongoose.model<CompanyDocument>('Company', CompanySchema);
