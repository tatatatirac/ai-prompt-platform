import { useState } from "react";
import API from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", form);
      alert("Registered successfully 🎉");
    } catch (err) {
      alert("Registration failed ❌");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <br /><br />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}