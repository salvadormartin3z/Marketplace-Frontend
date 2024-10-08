import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.styles.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/crear-vendedores`,
        {
          email,
          password,
        }
      );
      const { token, role } = response.data;
      setSuccesMessage(response.data);
      login(token, role);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      if (role === "vendedor") {
        navigate("/seller-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Seller Registration</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {succesMessage && <p className="succes-message">{succesMessage}</p>}
        <div className="form-button-container">
          <button className="form-button" type="submit">
            Register
          </button>
        </div>
      </form>
      <p className="register-prompt">
        Already have an account?{" "}
        <Link to="/login" className="register-link">
          Log in here
        </Link>
        .
      </p>
    </div>
  );
}

export default RegisterPage;
