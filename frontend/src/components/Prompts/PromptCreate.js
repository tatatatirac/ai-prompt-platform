import React, { useState } from "react";
import API from "../../services/api";

function PromptCreate({ fetchPrompts }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/prompts/generate/", {
      raw_input: input,
      ai_target: "gpt",
      mode: "standard",
      character_limit: 1000,
    });
    fetchPrompts();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={e => setInput(e.target.value)} placeholder="Write prompt description" />
      <button>Generate Prompt</button>
    </form>
  );
}

export default PromptCreate;