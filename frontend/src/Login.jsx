import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!username.trim() || !password.trim()) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username: username.trim(),
                password: password.trim()
            });

            const { token, username: user } = response.data;
            onLoginSuccess(token, user);
        } catch (err) {
            console.error("Login error:", err);
            if (err.response?.status === 401) {
                setError("Invalid username or password");
            } else if (err.response?.data) {
                setError(typeof err.response.data === 'string'
                    ? err.response.data
                    : err.response.data.message || "Login failed");
            } else {
                setError("Unable to connect to server");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1 className="auth-title">TaskNest</h1>
                    <p className="auth-subtitle">Sign in to your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <div className="auth-input-group">
                        <label htmlFor="username" className="auth-label">
                            <FaUser className="auth-icon" />
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            placeholder="Enter your username"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="password" className="auth-label">
                            <FaLock className="auth-icon" />
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            "Signing in..."
                        ) : (
                            <>
                                <FaSignInAlt /> Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-switch-text">
                        Don't have an account?{" "}
                        <button
                            onClick={onSwitchToRegister}
                            className="auth-switch-button"
                            disabled={loading}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;