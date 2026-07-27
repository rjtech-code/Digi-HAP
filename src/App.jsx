import { Routes, Route } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
import ToiletDetails from './pages/ToiletDetails'

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
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
            <Route path="/public-facilities/toilets/:id" element={<ToiletDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </WeatherProvider>
  )
}

export default App
