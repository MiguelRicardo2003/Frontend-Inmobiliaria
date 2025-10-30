import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import authService from './services/auth.service';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message || 'Error al enviar el código');
      }
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              ¡Correo Enviado!
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              Hemos enviado un código de verificación a <strong>{email}</strong>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📧 Revisa tu bandeja de entrada y tu carpeta de spam. El código expirará en 10 minutos.
              </p>
            </div>

            <Link
              to={`/verify-otp?email=${encodeURIComponent(email)}`}
              className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-center"
            >
              Ingresar Código
            </Link>

            <Link
              to="/login"
              className="block text-center text-indigo-600 hover:text-indigo-700 mt-4 text-sm"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-gray-600">
              Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Enviando...
                </>
              ) : (
                'Enviar Código'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">💡 Consejos de seguridad</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Verifica que el correo sea correcto</li>
            <li>• Revisa tu carpeta de spam si no ves el correo</li>
            <li>• El código expira en 10 minutos</li>
            <li>• Nunca compartas tu código con nadie</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
