import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from './pages/Profile'
import AuthProvider from './components/AuthProvider'
import Landing from './pages/Landing'
import { Provider } from 'react-redux'
import store from './store'
import Bookings from './pages/Bookings'


const App = () => {
  return (

    <AuthProvider>
      <Provider store={store} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Landing />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/bookings/:bookingId' element={<Bookings />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}

export default App