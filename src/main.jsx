import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// This line finds the 'root' element in your HTML and creates a React root.
// The App component and all its children are then rendered inside this root.
createRoot(document.getElementById("root")).render(<App />);