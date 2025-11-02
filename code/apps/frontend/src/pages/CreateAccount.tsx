import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CreateAccount() {
  const _navigate = useNavigate();
  const { randomRegister } = useAuth();
}
