import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            });

            const { token, username: user } = response.data;
            onRegisterSuccess(token, user);
        } catch (err) {
            console.error("Registration error:", err);
            if (err.response?.data) {
                setError(typeof err.response.data === 'string'
                    ? err.response.data
                    : err.response.data.message || "Registration failed");
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
                    <p className="auth-subtitle">Create your account</p>
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
                            placeholder="Choose a username"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="email" className="auth-label">
                            <FaEnvelope className="auth-icon" />
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                            placeholder="Enter your email"
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
                            placeholder="Choose a password (min 6 characters)"
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="confirmPassword" className="auth-label">
                            <FaLock className="auth-icon" />
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="auth-input"
                            placeholder="Re-enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            "Creating account..."
                        ) : (
                            <>
                                <FaUserPlus /> Sign Up
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-switch-text">
                        Already have an account?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="auth-switch-button"
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;