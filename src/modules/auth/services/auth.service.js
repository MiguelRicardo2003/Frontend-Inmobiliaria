import apiClient from '@core/services/apiService';

const authService = {
  // Login
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { accessToken, usuario } = response.data;
      
      // Guardar token y usuario
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return { success: true, data: { accessToken, usuario } };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  // Registar
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      // Verificar si la respuesta es exitosa
      if (response.data.success) {
        return { 
          success: true, 
          data: response.data,
          message: response.data.message || 'Usuario registrado correctamente'
        };
      }
      
      return { 
        success: false, 
        message: response.data.message || 'Error al registrar usuario'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg ||
                          'Error al registrar usuario';
      throw new Error(errorMessage);
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // Obtener Usuarios
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  // Verificar si el usuario esta autenticado
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  // Solicitar código de recuperación de contraseña
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', { correo: email });
      return { 
        success: true, 
        data: response.data,
        message: response.data.message || 'Código enviado correctamente'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al enviar el código';
      throw new Error(errorMessage);
    }
  },

  // Verificar código OTP
  async verifyOTP(email, otp) {
    try {
      const response = await apiClient.post('/auth/verify-otp', { 
        correo: email, 
        otp: otp 
      });
      return { 
        success: true, 
        data: response.data,
        resetToken: response.data.resetToken,
        message: response.data.message || 'Código verificado correctamente'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Código de verificación inválido';
      throw new Error(errorMessage);
    }
  },

  // Restablecer contraseña
  async resetPassword(resetToken, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', { 
        resetToken: resetToken,
        nuevaContrasenia: newPassword 
      });
      return { 
        success: true, 
        data: response.data,
        message: response.data.message || 'Contraseña restablecida exitosamente'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al restablecer la contraseña';
      throw new Error(errorMessage);
    }
  }
};

export default authService;
