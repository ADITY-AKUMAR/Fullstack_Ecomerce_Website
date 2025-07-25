// Importing mongoose and the mongo object from the mongoose package
import mongoose, { mongo } from "mongoose";

// Creating a new schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Name field: must be a string, required, and trimmed (no leading/trailing spaces)
    name: {
      type: String,
      required: true,
      trim: true
    },
    // Email field: must be a string, required, and must be unique
    email: {
      type: String,
      required: true,
      unique: true
    },
    // Password field: must be a string and is required
    password: {
      type: String,
      required: true
    },
    // Phone field: must be a string and is required
    phone: {
      type: String,
      required: true
    },
    // Address field: must be a string and is required
    address: {
      type: String,
      required: true
    },
    // Role field: a number, by default set to 0 (like 0 = user, 1 = admin)
    role: {
      type: Number,
      default: 0
    }
  },
  // Second argument: enables automatic creation of `createdAt` and `updatedAt` timestamps
  { timestamps: true }
);

// Exporting the model with name 'user', based on the userSchema defined above
export default mongoose.model('user', userSchema);
