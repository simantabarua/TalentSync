import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  image?: string;
  skills: string[];
  experience?: string;
  savedJobs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['USER', 'ADMIN', 'MANAGER'], default: 'USER' },
    image: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
    savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
