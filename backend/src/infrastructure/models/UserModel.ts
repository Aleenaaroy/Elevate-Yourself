//backend\src\infrastructure\models\UserModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../domain/entities/User';

// Create an intersection type of Mongoose Document and the User interface
export interface UserDocument extends Document, Omit<User, 'id'> {
  _id: string; // Mongoose's _id field, if required
}

const educationSchema = new Schema({
  institute: { type: String },
  fieldOfStudy: { type: String },
  instituteLocation: { type: String }
});

const professionSchema = new Schema({
  companyName: { type: String },
  jobLocation: { type: String },
  role: { type: String }
});

const resumeSchema = new Schema({
  data: { type: Buffer },
  contentType: { type: String }
});

const savedPostSchema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
  addedAt: { type: Date, default: Date.now }
});

const connectionRequestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

const followingCompanySchema = new Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' }
});

const appliedJobSchema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'job openings' },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema<UserDocument>({
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
  phone: { type: Number },
  role: {
    type: String,
    required: true,
    enum: ['Candidate', 'Company']
  },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  location: { type: String },
  headline: { type: String },
  skills: { type: String },
  profileImage: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
  },
  education: [educationSchema],
  profession: [professionSchema],
  resume: resumeSchema,
  savedPosts: [savedPostSchema],
  pendingRequests: [connectionRequestSchema],
  manageRequests: [connectionRequestSchema],
  connections: [connectionRequestSchema],
  followingCompanies: [followingCompanySchema],
  appliedJobs: [appliedJobSchema],
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'chats' },
  createdOn: { type: Date, default: Date.now }
});

const userModel = mongoose.model<UserDocument>('users', userSchema);
export default userModel;
