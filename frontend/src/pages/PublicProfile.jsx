import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/public/${username}`);
        console.log("Public profile data:", res.data);
        setProfile(res.data.profile);
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error fetching public profile:", err);
        setError(err.response?.data?.message || "Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
        <h2>❌ {error}</h2>
        <p>The profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* PROFILE HEADER */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "48px",
              fontWeight: "bold",
            }}
          >
            {profile?.fullName?.charAt(0).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ margin: "0 0 10px 0" }}>{profile?.fullName}</h1>
            <p style={{ margin: "5px 0", color: "#666" }}>
              <strong>@{profile?.username}</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#555" }}>
              📍 {profile?.college}
            </p>
            <p style={{ margin: "5px 0", color: "#555" }}>
              🎓 {profile?.degree} • Year: {profile?.year}
            </p>
            <p style={{ margin: "10px 0", color: "#007bff", fontWeight: "bold" }}>
              Track: {profile?.skillTrack}
            </p>
          </div>
        </div>

        {/* SKILLS SECTION */}
        {profile?.skills && profile?.skills.length > 0 && (
          <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#e7f3ff",
                    color: "#0056b3",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROJECTS SECTION */}
      <div>
        <h2 style={{ marginBottom: "20px" }}>
          Projects ({projects.length})
        </h2>

        {projects.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No projects added yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project) => (
              <div
                key={project._id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                  {project.title}
                </h3>

                <p
                  style={{
                    margin: "10px 0",
                    color: "#666",
                    lineHeight: "1.5",
                    fontSize: "14px",
                  }}
                >
                  {project.description}
                </p>

                {/* TECH STACK */}
                <div style={{ margin: "15px 0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee", display: "flex", gap: "10px" }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      🔗 GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#28a745",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      🌐 Live Demo
                    </a>
                  )}
                </div>

                {/* DATE */}
                <p
                  style={{
                    margin: "10px 0 0 0",
                    color: "#999",
                    fontSize: "12px",
                  }}
                >
                  Added: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
