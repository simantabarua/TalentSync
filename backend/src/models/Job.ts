import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number; currency: string };
  jobType: string;
  category: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: mongoose.Types.ObjectId;
  status: 'Active' | 'Closed' | 'Draft';
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    jobType: { type: String, required: true },
    category: { type: String, required: true },
    skills: [{ type: String }],
    description: { type: String, required: true },
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Active', 'Closed', 'Draft'], default: 'Active' },
  },
  { timestamps: true }
);

JobSchema.index({ category: 1 });
JobSchema.index({ status: 1, createdAt: -1 });
JobSchema.index({ 'salary.min': 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ title: 'text', description: 'text', skills: 'text' });

export const Job = mongoose.model<IJob>('Job', JobSchema);
