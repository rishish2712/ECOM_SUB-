import { Document, Model, model, models, Schema } from 'mongoose';

// Define IUser interface including resetPasswordToken & resetPasswordExpires
export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    image?: string;
    emailVerified?: boolean;
    resetPasswordToken?: string | null; // ✅ Ensure it's defined
    resetPasswordExpires?: Date | null; // ✅ Ensure it's defined
}

// Define User Schema
const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        role: { type: String, required: true, default: 'User' },
        password: { type: String, required: true },
        image: { type: String, default: null },
        emailVerified: { type: Boolean, default: false },
        resetPasswordToken: { type: String, default: null }, // ✅ Ensure this exists
        resetPasswordExpires: { type: Date, default: null }, // ✅ Ensure this exists
    },
    { timestamps: true }
);

// Use existing model if available to avoid overwriting
const User = models.User || model<IUser>('User', UserSchema);

export default User;
