import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Semantizer } from "@semantizer/types";
import semantizer from "@semantizer/default";

declare global {
  var semantizer: Semantizer;
}

globalThis.semantizer = semantizer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
