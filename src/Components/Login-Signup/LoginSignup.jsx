import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import prudentialLogo from "../Assets/Prudential-logo.png";

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    async function handleRegistration(event) {
        event.preventDefault();

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                // Registration was successful, you can handle it here (e.g., show a success message).
            } else if (response.status === 409) {
                // Email already registered, handle accordingly.
            } else {
                // Handle other errors (e.g., server error).
            }
        } catch (error) {
            console.error(error);
            // Handle the error here.
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
    
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Use the same formData object as for registration.
            });
    
            if (response.status === 200) {
                // Login was successful, you can handle it here (e.g., redirect to the dashboard).
            } else if (response.status === 401) {
                // Invalid credentials, handle accordingly (e.g., show an error message).
            } else {
                // Handle other errors (e.g., server error).
            }
        } catch (error) {
            console.error(error);
            // Handle the error here.
        }
    }
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="logo-container">
                    <img src={prudentialLogo} alt="Prudential Logo" className="logo" />
                </div>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? (
                    <div></div>
                ) : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input 
                        type="text" 
                        placeholder="Name"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                        type="email" 
                        placeholder="Email Id"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        />
                </div>
            </div>

            {action === "Sign Up" ? (
                <div></div>
            ) : (
                <div className="forgot-password">
                    Forget Password? <span>Click here!</span>
                </div>
            )}
            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={action === "Sign Up" ? handleRegistration : () => setAction("Sign Up")}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={action === "Login" ? () => handleLogin() : () => setAction("Login")}
                    
                >
                    Log in
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
