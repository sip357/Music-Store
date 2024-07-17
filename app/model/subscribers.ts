import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the product
export interface IUser extends Document {
  name: string;
  email: string;
  //password: string;
}

// Define the schema
const productSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {type: String, required: true, unique: true}
});

// Create the model
const User = mongoose.model<IUser>('Product', productSchema);

export default User;