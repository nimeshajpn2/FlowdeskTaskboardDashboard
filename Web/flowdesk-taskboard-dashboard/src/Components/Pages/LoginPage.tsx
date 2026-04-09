import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Services/ApiService.ts";
import { LoginViewModel, RegisterViewModel } from "../../Models/AuthModels";

  const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const role = 'User';
    
  let [IsRegisterForm, setIsRegisterForm] = useState(false);

    useEffect(() => {
    fetch("https://localhost:7085/api/auth/logout", {
    method: "POST",
    credentials: "include", // important for httpOnly cookie
    });
    }, []);
      
    const handleLogin = async (e: React.FormEvent) => { e.preventDefault(); setError("");
    const loginData: LoginViewModel = { userName, password };
    try {
      await api.login(loginData);
      navigate("/"); // redirect to home
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
    };
    
    const handelRegister = async (e: React.FormEvent) => { e.preventDefault(); setError("");
      if (rePassword !== password) {
            setError("Passwords do not match");
            return;
      }
      const registerData: RegisterViewModel = { userName, email, password, role};
        try {
          console.log(registerData);
          await api.register(registerData);
          navigate("/"); // redirect to home
      } catch (err: any) {
        setError(err.response?.data?.message || "Register failed");
      }
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 max-w-md p-4 bg-white rounded shadow" style={{ display: !IsRegisterForm ? "block" : "none" }}>
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
          <button className="btn btn-success w-100 mt-2" onClick={(e) => { e.preventDefault(); setIsRegisterForm(true); }}>
            New User Register
          </button>
        </form>
      </div>
      <div className="w-50 max-w-md p-4 bg-white rounded shadow" style={{ display: IsRegisterForm ? "block" : "none" }}>
        <h2 className="text-center mb-4">Register</h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handelRegister}>
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
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-3">
            <label>RePassword</label>
            <input
              type="password"
              className="form-control"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100 mt-2" type="submit">
            Register
          </button>
          <button className="btn btn-primary w-100 mt-2" onClick={(e) => { e.preventDefault(); setIsRegisterForm(false); }}>
            Back to Login Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;