import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { saveToken } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("Login response:", res.data); // 👈 DEBUG
    console.log("Full response:", res); // 👈 DEBUG

    // 🔑 SAVE TOKEN
    if (res.data.token) {
      saveToken(res.data.token);
      console.log("Token saved successfully:", res.data.token); // 👈 DEBUG
      console.log("Token in localStorage:", localStorage.getItem("token")); // 👈 DEBUG
      setIsLoggedIn(true);
    } else {
      console.error("No token in response:", res.data);
      setError("No token received from server");
      return;
    }
  } catch (err) {
    console.error("Login error:", err); // 👈 DEBUG
    setError(
      err.response?.data?.message || "Login failed. Try again."
    );
  }
};


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoggedIn && (
        <div style={{ color: "green", marginBottom: "20px" }}>
          ✅ Login successful! 
          <button onClick={() => {
            console.log("Navigating to dashboard, token:", localStorage.getItem("token"));
            navigate("/dashboard");
          }}>
            Go to Dashboard
          </button>
        </div>
      )}

      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Login
        </button>
      </form>
      )}
    </div>
  );
}

export default Login;
