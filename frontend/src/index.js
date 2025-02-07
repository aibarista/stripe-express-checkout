import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";

const container = document.getElementById("root"); // Get the root container
const root = createRoot(container); // Create a React root
root.render(<App />);






