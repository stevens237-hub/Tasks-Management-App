import Login from './pages/Login'
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Home from './pages/Home';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Trash from './pages/Trash';
import TaskDetails from './pages/TaskDetails';  
import MainLayout from './pages/MainLayout';



function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/" element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        
        {/* Routes protégées avec Layout */}
        <Route 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>
      </Routes>

      <Toaster richColors/>
    </main>
  );
}

export default App
