import { useState } from "react";
import App from "./App";
import Appv2 from "./Appv2";

export default function Main() {
  const [prog, setProg] = useState("v2");

  return (
    <div style={{ background: "#08080b", minHeight: "100vh" }}>
      {/* Sélecteur de programme */}
      <div style={{
        display: "flex",
        gap: 4,
        padding: "12px 14px",
        background: "#08080b",
        position: "sticky",
        top: 0,
        zIndex: 200,
        maxWidth: 480,
        margin: "0 auto",
        borderBottom: "1px solid #26262e",
      }}>
        <button
          onClick={() => setProg("v1")}
          style={{
            flex: 1,
            padding: "10px 8px",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s",
            background: prog === "v1" ? "#ff4422" : "#1a1a21",
            color: prog === "v1" ? "#fff" : "#7c7c8a",
            boxShadow: prog === "v1" ? "0 4px 16px rgba(255,68,34,0.3)" : "none",
          }}
        >
          📅 Programme 1 — 30 Jours
        </button>
        <button
          onClick={() => setProg("v2")}
          style={{
            flex: 1,
            padding: "10px 8px",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s",
            background: prog === "v2" ? "#aa55ff" : "#1a1a21",
            color: prog === "v2" ? "#fff" : "#7c7c8a",
            boxShadow: prog === "v2" ? "0 4px 16px rgba(170,85,255,0.3)" : "none",
          }}
        >
          💪 Programme V2 — V-Shape
        </button>
      </div>

      {/* Contenu */}
      {prog === "v1" ? <App /> : <Appv2 />}
    </div>
  );
}