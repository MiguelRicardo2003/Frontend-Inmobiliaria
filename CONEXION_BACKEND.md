# Instrucciones para Conectar Frontend con Backend

## Archivos Creados/Modificados

### Nuevos archivos creados:
- `src/core/services/apiService.js` - Servicio centralizado de API
- `src/core/services/propertyService.js` - Servicio para propiedades
- `src/core/services/projectService.js` - Servicio para proyectos
- `src/core/services/listService.js` - Servicio para listas

### Archivos modificados:
- `src/core/store/auth/AuthProvider.jsx` - Actualizado para usar API real
- `src/modules/backoffice/properties/hooks/useProperties.js` - Conectado con API
- `src/modules/backoffice/properties/hooks/useProjects.js` - Conectado con API
- `vite.config.js` - Configurado proxy para desarrollo local

## Configuración Necesaria

### 1. Variables de Entorno

**Crear archivo `.env` en el directorio raíz del frontend:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=JustHome Inmobiliaria
VITE_APP_VERSION=1.0.0
```

**Crear archivo `.env` en el directorio raíz del backend:**
```env
# Configuración de la API
API_PREFIX=/api
PORT=3000
NODE_ENV=development

# Configuración de la base de datos PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=inmobiliaria_db
PG_USERNAME=tu_usuario
PG_PASSWORD=tu_password

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRES_IN=8h

# CORS (para desarrollo)
FRONTEND_URL=http://localhost:5173
```

### 2. Comandos para Ejecutar

**Backend:**
```bash
cd Backend-Inmobiliaria
npm install
npm run dev
```

**Frontend:**
```bash
cd Frontend-Inmobiliaria
npm install
npm run dev
```

## Pruebas de Conexión

### 1. Verificar Backend
```bash
curl http://localhost:3000/api/info
```

### 2. Verificar Frontend
```bash
curl http://localhost:5173
```

### 3. Probar Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"test@ejemplo.com","contrasenia":"password123"}'
```

### 4. Probar Obtener Proyectos
```bash
curl http://localhost:3000/api/projects
```

## Criterios de Aceptación

- ✅ Frontend carga sin errores en `http://localhost:5173`
- ✅ Backend responde en `http://localhost:3000/api/info`
- ✅ Login funciona y guarda token en localStorage
- ✅ Dashboard carga proyectos desde la API
- ✅ Formularios de propiedades se conectan con endpoints
- ✅ Trello board carga listas y propiedades
- ✅ Drag & drop actualiza orden en backend

## Notas Importantes

1. **Base de datos**: Asegúrate de que PostgreSQL esté configurado y corriendo
2. **Puertos**: Backend en puerto 3000, Frontend en puerto 5173
3. **CORS**: Ya configurado para desarrollo local
4. **Autenticación**: Usa JWT con expiración de 8 horas
5. **Proxy**: Vite configurado para redirigir `/api` al backend

## Solución de Problemas

### Error de CORS
- Verificar que el backend esté corriendo en puerto 3000
- Verificar configuración CORS en `app.js`

### Error de conexión
- Verificar que las variables de entorno estén configuradas
- Verificar que el backend esté corriendo
- Verificar logs del navegador para errores específicos

### Error de autenticación
- Verificar que el token se esté guardando en localStorage
- Verificar que el interceptor esté agregando el token a las requests
- Verificar que el backend esté validando correctamente el token
