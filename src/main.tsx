import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NodexaLanding from "./NodexaLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NodexaLanding />
  </StrictMode>
);
