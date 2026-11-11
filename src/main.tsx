import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Freelancer from "./pages/Freelancer";
import Work from "./pages/Work";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/work/:slug" element={<Work />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
