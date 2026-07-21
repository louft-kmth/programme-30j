import { useState } from "react";
import App from "./App";
import Appv2 from "./Appv2";
import AppV3 from "./AppV3";

export default function Main() {
  const [prog, setProg] = useState("v3");

  const programs = [
    { id: "v1", label: "📅 30 Jours", color: "#ff4422", shadow: "rgba(255,68,34,0.3)" },
    { id: "v2", label: "💪 V-Shape", color: "#aa55ff", shadow: "rgba(170,85,255,0.3)" },
    { id: "v3", label: "🔥 Full Body", color: "#ffbb22", shadow: "rgba(255,187,34,0.3)" },
  ];

  return (
    <div style={{ background: "#08080b", minHeight: "100vh" }}>
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
        {programs.map((p) => (
          <button
            key={p.id}
            onClick={() => setProg(p.id)}
            style={{
              flex: 1,
              padding: "10px 6px",
              border: "none",
              borderRadius: 9,
              fontWeight: 700,
              fontSize: 10,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.25s",
              background: prog === p.id ? p.color : "#1a1a21",
              color: prog === p.id ? (p.id === "v3" ? "#000" : "#fff") : "#7c7c8a",
              boxShadow: prog === p.id ? `0 4px 16px ${p.shadow}` : "none",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {prog === "v1" && <App />}
      {prog === "v2" && <Appv2 />}
      {prog === "v3" && <AppV3 />}
    </div>
  );
}