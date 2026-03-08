import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/token/", {
        username: form.username,
        password: form.password
      });

      // sačuvaj tokene
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful");

      // redirect
      navigate("/prompts");

    } catch (err) {

      console.error(err);
      alert("Login failed");

    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-80">

        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="border p-2 w-full mb-3 rounded"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}