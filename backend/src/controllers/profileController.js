import Profile from "../models/Profile.js";

const makeUsername = (fullName) =>
  fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const createProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({ userId: req.userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const baseUsername = makeUsername(req.body.fullName);
    let username = baseUsername;

    // ensure uniqueness
    let count = 1;
    while (await Profile.findOne({ username })) {
      username = `${baseUsername}-${count++}`;
    }

    const profile = await Profile.create({
      userId: req.userId,
      username,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
