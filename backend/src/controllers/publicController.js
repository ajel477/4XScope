import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({ username }).lean();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const projects = await Project.find({ profileId: profile._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ profile, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
