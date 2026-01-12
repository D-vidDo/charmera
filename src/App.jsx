// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'

function App() {
  return (
    <div>
      <h1>Hello, Charmera!</h1>
    </div>
    <BrowserRouter>
      <nav className="p-4 flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

