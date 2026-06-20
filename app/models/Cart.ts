import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
    id: string;
    userId: string | Types.ObjectId;
    items: {
        productId: string | Types.ObjectId;
        licenceTier: "basic" | "premium" | "exclusive";
    }[];
    dateCreated?: Date;
    dateUpdated?: Date;
}

const cartSchema = new Schema<ICart>(
    {
        id: { type: String, required: true, unique: true },
        userId: { type: String, ref: "User", required: true },
        items: [
            {
                productId: { type: String, ref: "Beat", required: true },
                licenceTier: {
                    type: String,
                    enum: ["basic", "premium", "exclusive"],
                    required: true,
                },
            },
        ],
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);