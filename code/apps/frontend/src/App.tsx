import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Questions/Questions'
import CreateQuestion from './pages/Questions/Create'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import NotFound from './pages/NotFound'
import History from './pages/Questions/History'
import { useAuth } from './context/AuthContext'
import { ProtectedRoute } from './Components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import { Layout } from './Components/Layout'
import './App.css'
import { CreateAccount } from './pages/CreateAccount'

function App() {
  const { userInformation } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          { userInformation?.role === 'admin' &&
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
          }
          <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        </Route>
        <Route path="/questions/create" element={<ProtectedRoute element={<CreateQuestion />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/random" element={<CreateAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
