import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      {/* Outer wrapper: flex column, centered */}
      <div className="flex flex-col items-center min-h-screen w-full">
        {/* Inner content: constrain width */}
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
