import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Services/ApiService.ts";
import { LoginViewModel } from "../../Models/AuthModels";

  const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
    fetch("https://localhost:7085/api/auth/logout", {
    method: "POST",
    credentials: "include", // important for httpOnly cookie
    });
    }, []);
      
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const loginData: LoginViewModel = { userName, password };

    try {
      await api.login(loginData);
      navigate("/"); // redirect to home
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 max-w-md p-4 bg-white rounded shadow">
        <h2 className="text-center mb-4">Login</h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;