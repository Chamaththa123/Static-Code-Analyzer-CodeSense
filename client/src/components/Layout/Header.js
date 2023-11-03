import React from "react";
import { useAuth } from "../../context/auth";
import "../../App.css"; // Import the external CSS file for styles
import Dropdown from 'react-bootstrap/Dropdown';

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

            <Dropdown>
              <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:'#0e0e1f',borderColor:'#0e0e1f'}}>
                {auth?.user?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout} href="/">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </>
        )}
      </div>
    </div>

  );
}

export default Header;
