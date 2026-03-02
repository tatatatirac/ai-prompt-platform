import React, { useEffect, useState } from "react";
import API from "../../services/api";

function PromptList() {
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const res = await API.get("/prompts/my/");
    setPrompts(res.data.results);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div>
      {prompts.map(p => (
        <div key={p.id}>
          <p>{p.generated_prompt}</p>
        </div>
      ))}
    </div>
  );
}

export default PromptList;