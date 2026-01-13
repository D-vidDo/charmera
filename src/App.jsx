import { BrowserRouter, Routes, Route } from "react-router-dom"; // ← remove useLocation if not needed elsewhere
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import AnimatedRoutes from "./components/AnimatedRoutes";

// Reusable variants (same as yours)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeOut",
};

function App() {
  return (
     <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen w-full">
        <div className="w-full max-w-6xl px-4">
          <Header />

          {/* Replace your <Routes> with this */}
          <Routes>
            <Route path="/" element={<AnimatedRoutes />} />
            <Route path="/upload" element={<AnimatedRoutes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;