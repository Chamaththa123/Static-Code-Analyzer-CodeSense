import React from "react";
import { useAuth } from "../../context/auth";
import profile from "../../images/profile.png";
import "../../App.css"; // Import the external CSS file for styles

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    window.alert("Logout Successfully");
  };

  return (
    <div className="header">
      <div>
        {!auth?.user ? (
          <>
            <a href="/login" className="header-link">Sign In</a>
            <a href="/register" className="header-link">Sign Up</a>
          </>
        ) : (
          <>
            
            <img src={profile} alt="Profile" className="profile-image" />
            <span className="username"><b>{auth?.user?.name}</b></span>
            <a onClick={handleLogout} className="header-link"><b>Logout</b></a>
          </>
        )}
      </div>
    </div>
    
  );
}

export default Header;
