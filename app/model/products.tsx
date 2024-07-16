import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the product
export interface IProduct extends Document {
  name: string;
  bpm: number;
  audio: string;
  tags: string[];
}

// Define the schema
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  bpm: { type: Number, required: true },
  audio: { type: String, required: true },
  tags: {type: [String], required: true}
});

// Create the model
const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

