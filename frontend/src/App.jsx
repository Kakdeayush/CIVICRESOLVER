import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import TrackReport from "./pages/TrackReport";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminComplaints from "./admin/AdminComplaints";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminSettings from "./admin/AdminSettings";
import ApiTest from "./components/ApiTest";
import PrivateRoute from "./routes/PrivateRoute";



function App() {

  const { user } = useAuth();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");


  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><ReportIssue /></PrivateRoute>} />
        <Route path="/track-report" element={<PrivateRoute><TrackReport /></PrivateRoute>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />


        <Route path="/api-test" element={<ApiTest />} />  {/* <-- New Route */}
        <Route
          path="/admin"
          element={<PrivateRoute role="admin"><AdminLayout /></PrivateRoute>}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>



      </Routes>


      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
