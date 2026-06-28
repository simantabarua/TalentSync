import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  resume: {
    url: string;
    filename: string;
    mimeType: string;
    size: number;
  };
  coverLetter?: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  matchScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resume: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
      mimeType: { type: String, required: true },
      size: { type: Number, required: true },
    },
    coverLetter: { type: String },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'], default: 'Pending' },
    matchScore: { type: Number },
  },
  { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

export const Application = mongoose.model<IApplication>('Application', ApplicationSchema);
