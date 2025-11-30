import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { colors, layout } from "./theme";

const rootElement = document.documentElement;
Object.entries(colors).forEach(([token, value]) => {
  rootElement.style.setProperty(`--color-${token}`, value);
});
Object.entries(layout).forEach(([token, value]) => {
  rootElement.style.setProperty(`--layout-${token}`, value);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
