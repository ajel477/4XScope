import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { logout } from "../utils/auth";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch profile & projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get("/profile/me");
        setProfile(profileRes.data);

        const projectsRes = await API.get("/projects/me");
        setProjects(projectsRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        console.error("Error response:", err.response?.status, err.response?.data);
        console.error("Token at error time:", localStorage.getItem("token"));
        
        // If 404 with "Profile not found", don't logout - just show setup message
        if (err.response?.status === 404 && err.response?.data?.message === "Profile not found") {
          setError("No profile found. Please create one first.");
          return;
        }
        
        setError("Unauthorized. Please login again.");
        logout();
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {error === "No profile found. Please create one first." && (
        <button onClick={() => navigate("/create-profile")}>
          Create Profile
        </button>
      )}

      {/* PROFILE SECTION */}
      {profile && (
        <div>
          <h3>{profile.fullName}</h3>
          <p>
            {profile.college} | {profile.degree} | {profile.year}
          </p>
          <p>Track: {profile.skillTrack}</p>
          <p>
            Public Profile:{" "}
            <a
              href={`/u/${profile.username}`}
              target="_blank"
              rel="noreferrer"
            >
              /u/{profile.username}
            </a>
          </p>
        </div>
      )}

      <hr />

      {/* PROJECTS SECTION */}
      <h3>My Projects</h3>

      {projects.length === 0 && <p>No projects added yet.</p>}

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.title}</strong>
            <br />
            {project.description}
            <br />
            Tech: {project.techStack.join(", ")}
          </li>
        ))}
      </ul>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/add-project")}
      >
        Add Project
      </button>
    </div>
  );
}

export default Dashboard;
