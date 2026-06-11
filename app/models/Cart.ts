import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
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
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Beat", required: true },
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