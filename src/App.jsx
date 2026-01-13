import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // ← add these
import Header from "./components/Header";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

// Optional: reusable variants for clean code
const pageVariants = {
  initial: { opacity: 0, y: 20 },    // start slightly faded + shifted down
  animate: { opacity: 1, y: 0 },     // fade in and slide to position
  exit: { opacity: 0, y: -20 },      // fade out and slide up
};

const pageTransition = {
  duration: 0.4,
  ease: "easeOut",
};

function App() {
  const location = useLocation(); // ← this is crucial

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen w-full">
        <div className="w-full max-w-6xl px-4">
          <Header />

          {/* Wrap Routes here */}
          <AnimatePresence mode="wait"> {/* "wait" = old page finishes exit before new enters */}
            <Routes location={location} key={location.pathname}>
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
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;