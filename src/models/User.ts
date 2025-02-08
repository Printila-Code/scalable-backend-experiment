// src/models/User.ts
import { Schema, model, Document } from 'mongoose';
import argon2 from 'argon2';

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

// Make sure to export the model!
export default model<IUser>('User', UserSchema);
