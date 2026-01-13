import { BrowserRouter, Routes, Route } from "react-router-dom"; // ← remove useLocation if not needed elsewhere
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

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

          {/* AnimatePresence around the whole Routes block */}
          <AnimatePresence mode="wait">
            <Routes>  {/* ← NO location or key here! */}
              <Route
                path="/"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                }
              />
              <Route
                path="/upload"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Upload />
                  </motion.div>
                }
              />
              {/* Add a catch-all if needed */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;