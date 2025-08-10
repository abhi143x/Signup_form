import { useState } from "react";
import "./SignUp.css";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        contact: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Environment variable with fallback
        const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

        try {
            const response = await fetch(`${apiBaseUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            // Alert with console instruction
            alert(`Welcome, ${formData.fullname}! You've signed up successfully. Open the console to see your data.`);

            // Show submitted data in console
            console.log("📌 Submitted Data:", formData);
            console.log("📌 Server Response:", data);

            setFormData({ fullname: "", email: "", contact: "", password: "" });
        } catch (error) {
            alert("Error signing up. Try again.");
            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup Form</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
