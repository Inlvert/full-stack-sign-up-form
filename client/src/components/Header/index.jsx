import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const hendleLogout = () => {
    dispatch(logout());
    clearToken();
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
        <h1>Hello {user ? `${user.firstName} ${user.lastName}` : "Guest"}</h1>
        <button onClick={hendleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
