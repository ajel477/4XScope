import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Parse tech stack - comma separated
      const techStackArray = techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      if (techStackArray.length === 0) {
        setError("Please add at least one technology");
        setLoading(false);
        return;
      }

      const res = await API.post("/projects", {
        title,
        description,
        techStack: techStackArray,
        githubUrl: githubUrl || undefined,
        demoUrl: demoUrl || undefined,
      });

      console.log("Project created:", res.data);
      setSuccess("Project added successfully! Redirecting to dashboard...");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Project creation error:", err);
      setError(
        err.response?.data?.message || "Failed to add project. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Add New Project</h2>

      {error && (
        <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "4px" }}>
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "green",
            backgroundColor: "#e6ffe6",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Project Title <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., E-commerce Platform"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your project, what it does, and key features..."
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box", fontFamily: "Arial" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Tech Stack <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
            placeholder="e.g., React, Node.js, MongoDB, Express"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
          <small style={{ color: "#666" }}>
            Enter technologies separated by commas
          </small>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>GitHub URL</label>
          <br />
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
          <small style={{ color: "#666" }}>Optional</small>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Demo URL / Live Link</label>
          <br />
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://my-project.com"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
          <small style={{ color: "#666" }}>Optional</small>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Adding..." : "Add Project"}
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

export default AddProject;
