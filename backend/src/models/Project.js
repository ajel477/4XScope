import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    githubUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
