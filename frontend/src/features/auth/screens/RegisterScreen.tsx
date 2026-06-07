import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../../../constants/routes';
import { AuthForm } from '../components/AuthForm';

export function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister() {
    setError('');

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Completá todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.HOME_TABS }],
});
  }

  return (
    <AuthForm
      mode="register"
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleRegister}
      onSecondaryAction={() => navigation.navigate(ROUTES.LOGIN)}
    />
  );
}