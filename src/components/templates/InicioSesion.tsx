import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/auth/auth';
import { LogIn, Lock } from 'lucide-react';

/**
 * Componente de inicio de sesión
 */
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Usamos las credenciales fijas para clientId y clientSecret
      await login({
        grant_type: 'password',
        clientId: '9e3096ee-4b3a-4069-b25d-1d1ec3cb008f',
        clientSecret: 'Tvx8NERj3XIb52q0JyGw8SNzuU6uUjL2q0O70Jei',
        username,
        password
      });

      // Guardamos el usuario en localStorage para mantener la sesión
      localStorage.setItem('user', JSON.stringify({ username }));
      
      // Redirigimos a la página principal de la aplicación
      navigate('/Facturas');
    } catch (err: any) {
      console.error('Error de inicio de sesión:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800">
      <div className="w-full max-w-4xl flex overflow-hidden rounded-xl shadow-2xl">
        {/* Lado izquierdo - Imagen y mensaje de bienvenida */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-8 flex-col justify-between">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-blue-800 font-bold text-2xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Factus</h1>
              <p className="text-sm text-blue-200">Sistema de Gestión</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Bienvenido de nuevo</h2>
            <p className="text-blue-200">Accede a tu cuenta para gestionar tus facturas y mantener tu negocio organizado.</p>
            
            {/* Imagen ilustrativa */}
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg">
                <div className="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">FC</div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-sm text-blue-200">© 2024 Factus. Todos los derechos reservados.</p>
          </div>
        </div>
        
        {/* Lado derecho - Formulario de inicio de sesión */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de usuario */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LogIn size={18} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Botón de enviar */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;