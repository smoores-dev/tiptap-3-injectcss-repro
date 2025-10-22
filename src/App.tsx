import { useState } from "react";
import { Editor } from "./Editor";

export function App() {
  const [key, setKey] = useState("one");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <button
        style={{ alignSelf: "flex-start" }}
        onClick={() => {
          setKey((prev) => (prev === "one" ? "two" : "one"));
        }}
      >
        Swap editor
      </button>
      <Editor key={key} />
    </div>
  );
}
