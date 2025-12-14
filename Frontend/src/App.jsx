import Login from './pages/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Home from './pages/Home';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/" element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster richColors/>
    </main>
  );
}

export default App
