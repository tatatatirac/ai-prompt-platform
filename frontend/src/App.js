import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PromptsPage from "./components/Prompts/PromptsPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/generate" element={<PromptsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;