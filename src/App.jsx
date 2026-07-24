import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WardTemperature from './pages/WardTemperature'
import WardDetails from './pages/WardDetails'
import CreateProfile from './pages/CreateProfile'
import HeatAlerts from './pages/HeatAlerts'
import About from './pages/About'
import Contact from './pages/Contact'
import CoolingStation from './pages/CoolingStation'
import PublicFacilities from './pages/PublicFacilities'
import Parks from './pages/Parks'
import ParkDetails from './pages/ParkDetails'
import PublicToilets from './pages/PublicToilets'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ward-temperature" element={<WardTemperature />} />
        <Route path="/ward/:id" element={<WardDetails />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/alerts" element={<HeatAlerts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cooling-station" element={<CoolingStation />} />
        <Route path="/public-facilities" element={<PublicFacilities />} />
        <Route path="/public-facilities/parks" element={<Parks />} />
        <Route path="/public-facilities/parks/:id" element={<ParkDetails />} />
        <Route path="/public-facilities/toilets" element={<PublicToilets />} />
      </Routes>
    </div>
  )
}

export default App
