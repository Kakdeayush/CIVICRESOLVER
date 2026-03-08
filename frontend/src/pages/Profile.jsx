import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../assets/css/profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              src="/img/profile.png"
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>

        <div className="profile-content">
          <h2 className="profile-name">{user.name}</h2>

          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;