import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WardDetails from './pages/WardDetails'
import CreateProfile from './pages/CreateProfile'
import HeatAlerts from './pages/HeatAlerts'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ward/:id" element={<WardDetails />} />
        <Route path="/profile" element={<CreateProfile />} />
        <Route path="/alerts" element={<HeatAlerts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
