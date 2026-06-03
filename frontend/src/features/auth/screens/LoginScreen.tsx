import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../../../constants/routes';
import { AuthForm } from '../components/AuthForm';

export function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Completá tu email y contraseña.');
      return;
    }

    navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME_TABS }],
});
  }

  function handleForgotPassword() {
    setError('La recuperación de contraseña se conectará más adelante.');
  }

  return (
    <AuthForm
      mode="login"
      email={email}
      password={password}
      remember={remember}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onRememberChange={setRemember}
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSecondaryAction={() => navigation.navigate(ROUTES.REGISTER)}
    />
  );
}