import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CreateAccount() {
  const navigate = useNavigate();
  const { randomRegister } = useAuth();

  useEffect(() => {
    async function createRandomAccount() {
      try {
        await randomRegister();
        navigate('/');
      } catch (error) {
        console.error('Account creation failed:', error);
        navigate('/register');
      }
    }
    createRandomAccount();
  }, [navigate, randomRegister]);

  return null;
}
