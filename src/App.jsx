import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RecipeDetails from './pages/RecipeDetails.jsx'
import Navbar from './components/Navbar.jsx'
import Favorites from './pages/Favorites.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <div className="w-screen min-h-screen bg-gray-50">
        <Navbar />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
         <Footer />
      </div>
    </>
  )
}

export default App
