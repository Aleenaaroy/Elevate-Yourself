// backend\src\infrastructure\models\CategoryModel.ts

import mongoose, { Document, Schema } from 'mongoose';
import { Category } from '../../domain/entities/Category';

export interface CategoryDocument extends Document, Omit<Category, 'id'> {
    _id: string; 
  }

const industryCategorySchema: Schema = new Schema({
    industry: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const CategoryModel = mongoose.model<CategoryDocument>('JobIndustry', industryCategorySchema);

export default CategoryModel;

