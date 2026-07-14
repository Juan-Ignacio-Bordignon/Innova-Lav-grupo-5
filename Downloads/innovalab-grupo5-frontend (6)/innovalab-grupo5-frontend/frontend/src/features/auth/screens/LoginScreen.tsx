import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../../../constants/routes';
import { AuthForm } from '../components/AuthForm';

type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const submitDisabled =
    loading ||
    !email.trim() ||
    !password.trim() ||
    Boolean(errors.email) ||
    Boolean(errors.password);

  function handleEmailChange(value: string) {
    setEmail(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      email: undefined,
      general: undefined,
    }));
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      password: undefined,
      general: undefined,
    }));
  }

  async function handleLogin() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Ingresá tu email.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Ingresá un email válido.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Ingresá tu contraseña.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // TODO: conectar con backend real cuando esté disponible
    // await login({ email: email.trim(), password });

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.HOME_TABS }],
    });
  }

  function handleForgotPassword() {
    setErrors({
      general: 'La recuperación de contraseña se conectará más adelante.',
    });
  }

  return (
    <AuthForm
      mode="login"
      email={email}
      password={password}
      remember={remember}
      loading={loading}
      submitDisabled={submitDisabled}
      emailError={errors.email}
      passwordError={errors.password}
      error={errors.general}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onRememberChange={setRemember}
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSecondaryAction={() => navigation.navigate(ROUTES.REGISTER)}
    />
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}