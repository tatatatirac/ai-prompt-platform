import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PromptCreate from "./components/Prompts/PromptCreate";
import PromptList from "./components/Prompts/PromptList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prompts" element={<PromptList />} />
        <Route path="/generate" element={<PromptCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
