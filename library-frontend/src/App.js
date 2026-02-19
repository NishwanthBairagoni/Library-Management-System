import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDetails from "./pages/admin/UserDetails";
import StudentDashboard from "./pages/student/StudentDashboard";
import LibrarianDashboard from "./pages/Librarian/LibrarianDashboard";

// Auth Pages (Existing)
import StudentLogin from "./pages/student/studentLogin";
import StudentRegister from "./pages/student/studentRegister";
import LibrarianLogin from "./pages/Librarian/librarianLogin";
import LibrarianRegister from "./pages/Librarian/librarianRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import LoginForm from "./components/Login/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        <Route path="/librarian/login" element={<LibrarianLogin />} />
        <Route path="/librarian/register" element={<LibrarianRegister />} />


        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Dashboard Routes (Protected in real app) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user/:userId" element={<UserDetails />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
