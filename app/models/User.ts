import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    role: "user" | "admin";
    dateCreated: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        dateCreated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
