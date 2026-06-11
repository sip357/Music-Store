import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
    userId: string | Types.ObjectId;
    items: {
        productId: string | Types.ObjectId;
        tier: number;
    }[];
    totalPrice: number;
    paymentStatus: "pending" | "paid" | "failed";
    paymentDate?: Date;
    dateCreated?: Date;
    status: "pending" | "completed" | "cancelled";
}

const orderSchema = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Beat", required: true },
                tier: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        paymentDate: { type: Date },
        dateCreated: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);