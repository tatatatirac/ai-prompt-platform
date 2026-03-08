import { useState } from "react";
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

      if (onCreated) onCreated();

      setInput("");

    } catch (err) {

      console.error(err);

    }
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-lg font-bold mb-4">
        Generate Prompt
      </h2>

      <form onSubmit={handleSubmit}>

        <textarea
          className="w-full border p-3 rounded mb-4"
          rows="4"
          placeholder="Describe what prompt you want..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Generate Prompt
        </button>

      </form>

    </div>

  );
}