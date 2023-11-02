import React from "react";
import { useAuth } from "../../context/auth";
import profile from "../../images/profile.png";
import "../../App.css"; // Import the external CSS file for styles

function Footer() {

  return (
    <div className="header">
      <a href="/dashboard/admin" className="header-link">Manager</a>
    </div>
    
  );
}

export default Footer;
