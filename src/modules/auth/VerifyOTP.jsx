import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';
import authService from './services/auth.service';

const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus primer input al cargar
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: borrar y volver atrás
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Flecha izquierda/derecha para navegar
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Verificar que sean 6 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Por favor, ingresa los 6 dígitos del código');
      return;
    }

    if (!email) {
      setError('Email no especificado');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authService.verifyOTP(email, otpCode);
      
      if (response.success && response.resetToken) {
        // Guardar token y navegar a restablecer contraseña
        navigate(`/reset-password?token=${response.resetToken}`);
      } else {
        setError(response.message || 'Código inválido');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email no especificado');
      return;
    }

    setError('');
    setResending(true);

    try {
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setError('');
        // Mostrar mensaje de éxito temporal
        const successMsg = 'Nuevo código enviado a tu correo';
        setError(successMsg);
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Error al reenviar el código');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <Link
            to="/forgot-password"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verificar Código
            </h2>
            <p className="text-gray-600">
              Ingresa el código de 6 dígitos enviado a
            </p>
            <p className="font-semibold text-gray-800">{email}</p>
          </div>

          {/* Error/Success Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-lg ${
              error.includes('enviado') 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                error.includes('enviado') ? 'text-green-600' : 'text-red-600'
              }`}>
                {error}
              </p>
            </div>
          )}

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  disabled={loading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              ¿No recibiste el código?
            </p>
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm disabled:opacity-50"
            >
              {resending ? 'Reenviando...' : 'Reenviar código'}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">💡 Tips</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• El código expira en 10 minutos</li>
            <li>• Puedes pegar el código completo</li>
            <li>• Revisa tu carpeta de spam</li>
            <li>• Usa las flechas para navegar entre dígitos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
