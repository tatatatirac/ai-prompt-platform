import { useState } from "react";
import API from "../../services/api";

export default function PromptBuilder() {

  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [aiModel, setAiModel] = useState("gpt");
  const [limit, setLimit] = useState(1500);

  const generatePrompt = async () => {

    try {

      const res = await API.post("/prompts/generate/", {
        raw_input: description,
        ai_target: aiModel,
        mode: "standard",
        character_limit: limit
      });

      setResult(res.data.generated_prompt);

    } catch (err) {

      console.error(err);

    }

  };

  const copyPrompt = () => {

    navigator.clipboard.writeText(result);

  };

  return (

    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Prompt Generator
      </h2>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows="4"
        placeholder="Describe what you want the AI to generate..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* AI MODEL */}

      <div className="mb-4">

        <label className="block mb-1 text-sm">
          AI Model
        </label>

        <select
          className="border p-2 rounded w-full"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
        >

          <option value="gpt">GPT</option>
          <option value="claude">Claude</option>
          <option value="gemini">Gemini</option>

        </select>

      </div>

      {/* CHARACTER LIMIT */}

      <div className="mb-4">

        <label className="block text-sm mb-1">
          Character Limit: {limit}
        </label>

        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="w-full"
        />

      </div>

      <button
        onClick={generatePrompt}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Prompt
      </button>

      {result && (

        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Generated Prompt
          </h3>

          <div className="bg-gray-100 p-4 rounded mb-2 whitespace-pre-wrap">
            {result}
          </div>

          <button
            onClick={copyPrompt}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Copy Prompt
          </button>

        </div>

      )}

    </div>
  );

}