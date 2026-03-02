import { useState, useEffect } from "react";
import API from "../../services/api";
import PromptCreate from "./PromptCreate";
import PromptList from "./PromptList";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    try {
      const res = await API.get("/prompts/my/");
      setPrompts(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div>
      <h2>Your Prompts</h2>
      <PromptCreate onCreated={fetchPrompts} /> 
      <PromptList prompts={prompts} />
    </div>
  );
}