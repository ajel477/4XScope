import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    skillTrack: {
      type: String,
      required: true,
    },
    skills: [String],
  },
  
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
