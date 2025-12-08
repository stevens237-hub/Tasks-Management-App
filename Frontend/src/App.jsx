import Login from './pages/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'sonner';

function layout() {

}
function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        {/* <Route element = {<layout/>}> */}
          <Route path="/" element={<Navigate to='/dashboard'/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        {/* </Route> */}

        <Route path='/login' element={<Login/>}/>
      </Routes>

      <Toaster richColors/>
    </main>
  );
}

export default App
