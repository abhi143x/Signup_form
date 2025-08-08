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
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(`Welcome, ${formData.fullname}! You've signed up successfully.`);
            setFormData({ fullname: "", email: "", contact: "", password: "" });
        } catch (error) {
            alert("Error signing up. Try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup Form</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
