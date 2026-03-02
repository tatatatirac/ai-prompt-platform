import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/token/", form);

      // Sačuvaj token u localStorage
      localStorage.setItem("access_token", res.data.access);
      alert("Login successful!");

      // Redirect na prompt listu
      nav("/prompts");
    } catch (err) {
      alert("Login failed ❌");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}