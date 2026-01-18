import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateProfile() {
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [skillTrack, setSkillTrack] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const res = await API.post("/profile", {
        fullName,
        college,
        degree,
        year,
        skillTrack,
        skills: skillsArray,
      });

      console.log("Profile created:", res.data);
      setSuccess("Profile created successfully! Redirecting to dashboard...");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Profile creation error:", err);
      setError(err.response?.data?.message || "Failed to create profile. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Create Your Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Full Name *</label>
          <br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>College *</label>
          <br />
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
            placeholder="e.g., XYZ University"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Degree *</label>
          <br />
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
            placeholder="e.g., B.Tech in CSE"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Year *</label>
          <br />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Skill Track *</label>
          <br />
          <select
            value={skillTrack}
            onChange={(e) => setSkillTrack(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select Track</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile">Mobile</option>
            <option value="DevOps">DevOps</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Skills (comma-separated)</label>
          <br />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., React, JavaScript, CSS"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <small style={{ color: "#666" }}>
            Enter skills separated by commas
          </small>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Profile
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 15px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </p>
    </div>
  );
}

export default CreateProfile;
