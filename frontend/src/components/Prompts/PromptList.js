import React, { useState } from "react";
import API from "../../services/api";

export default function PromptCreate({ onCreated }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/prompts/generate/", {
        raw_input: input,
        ai_target: "gpt",
        mode: "standard",
        character_limit: 1500,
      });
      onCreated(); // poziva fetchPrompts iz parent-a
    } catch (err) {
      alert("Error generating prompt");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter prompt description…"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Generate Prompt</button>
    </form>
  );
}