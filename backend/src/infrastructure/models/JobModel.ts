// Backend/models/JobModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Job } from '../../domain/entities/Job';

export interface JobDocument extends Document, Omit<Job, 'id'> {
    _id: string; 
  }


// Define the Job schema
const jobSchema: Schema = new Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'companies',
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salaryPackage: {
            type: String,
            required: true,
        },
        requirements: {
            type: String,
            required: true,
        },
        industry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job industry',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        
    },
    { timestamps: true }
);


const JobModel = mongoose.model<JobDocument>('job openings', jobSchema);

export default JobModel;
