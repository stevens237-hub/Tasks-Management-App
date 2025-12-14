import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-2">
                Bienvenue, {user?.username}!
              </h1>
              <p className="text-gray-600">Email: {user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              label="Déconnexion"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tableau de bord</h2>
          <p className="text-gray-600">
            Votre tableau de bord est prêt. Vous pouvez maintenant ajouter vos fonctionnalités ici.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard