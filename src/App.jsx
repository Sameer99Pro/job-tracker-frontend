import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddApplication />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditApplication />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App