import React from "react";
import { NavLink } from "react-router-dom";

const navStyle = {
  background: "linear-gradient(90deg, #0f2027, #2c5364)",
  padding: "0 24px",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 16px",
  fontWeight: 500,
  fontSize: 17,
  letterSpacing: 0.5,
  transition: "color 0.2s",
};

const activeLink = {
  color: "#ffd700",
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>
        Kabaddi Player Digital ID
      </div>
      <div>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLink } : linkStyle)}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLink } : linkStyle)}
        >
          Register
        </NavLink>
        <NavLink
          to="/verify"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLink } : linkStyle)}
        >
          Verify
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLink } : linkStyle)}
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
