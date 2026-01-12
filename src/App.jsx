// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
