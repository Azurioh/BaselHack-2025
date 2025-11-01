// Fonction pour décoder un JWT et extraire le userId
export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return null;
  }

  try {
    // Décoder le JWT (sans vérification de signature côté client)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    
    // Le userId peut être dans différents champs selon ton backend
    return payload.userId || payload.id || payload.sub || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
