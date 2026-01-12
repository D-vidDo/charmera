import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      {/* Outer flex container to center the inner max-width container */}
      <div className="min-h-screen bg-white flex justify-center">
        {/* Inner container limits width and adds horizontal padding */}
        <div className="w-full max-w-6xl px-4">
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
