import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/u/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


