import { createRoot } from "react-dom/client";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Rekognize from "./pages/Rekognize";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Rekognize />} />
      </Route>
    </Routes>
  </Router>
);
