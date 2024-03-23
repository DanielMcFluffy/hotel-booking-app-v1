import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from './pages/Profile'
import AuthProvider from './components/AuthProvider'
import Landing from './pages/Landing'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Landing />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App