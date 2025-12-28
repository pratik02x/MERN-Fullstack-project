import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import updatePassword from '../pages/updatePassword';
function Navbar() {

  const { loginstatus, setloginstatus,username,setusername} = useContext(LoginContext);
  const navigate = useNavigate();

  const logout = () => {
    setloginstatus(false);
    navigate("/home");
  };


  const changepassword=()=>{
        navigate("/updatepassword")
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0d6efd' }}>
      <div className="container-fluid">
       {loginstatus ?<Link className="navbar-brand text-white" to="/home">
          Student Portal
        </Link>  : <Link className="navbar-brand text-white" to="/home">
          Sunbeam Institute
        </Link>}
        

        <div className="collapse navbar-collapse show">

          {/* LEFT */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item ms-3">
              <Link className="nav-link text-white" to="/home">Home</Link>
            </li>

            <li className="nav-item ms-3">
              <Link className="nav-link text-white" to="/aboutus">About Us</Link>
            </li>

            {/* only for login */}
           {loginstatus ?<li className="nav-item ms-3">
              <Link className="nav-link text-white" to="/mycourses">My Courses</Link>
            </li> : null}
          </ul>

          {/* RIGHT */}
          

<ul className="navbar-nav ms-auto">
  {!loginstatus ? (
    <li className="nav-item">
      <Link className="nav-link text-white fw-bold" to="/login">
        Login
      </Link>
    </li>
  ) : (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle text-white fw-bold"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer" }}
      >
        {username}
      </span>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button className="dropdown-item" onClick={logout}>
            Sign Out
          </button>
        </li>
          
          <li>
          <button className="dropdown-item" onClick={changepassword} >
           
            Update password
          </button>
        </li>
        
      </ul>
    </li>
  )}
</ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
