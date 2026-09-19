export const environment = {
  production: true,
  // Sur Vercel, le navigateur appelle toujours /api/... (même origine, pas de CORS).
  // Vercel redirige en coulisses vers my-json-server (voir vercel.json).
  apiUrl: '/api',
};
