import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../../../constants/routes';
import { AuthForm } from '../components/AuthForm';
import { register } from '../services/authService';

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const submitDisabled =
    loading ||
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    Boolean(errors.name) ||
    Boolean(errors.email) ||
    Boolean(errors.password) ||
    Boolean(errors.confirmPassword);

  function handleNameChange(value: string) {
    setName(value);
    clearError('name');
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    clearError('email');
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    clearError('password');
  }

  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);
    clearError('confirmPassword');
  }

  function clearError(field: keyof RegisterErrors) {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      general: undefined,
    }));
  }

  async function handleRegister() {
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Ingresá tu nombre.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Ingresá tu email.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Ingresá un email válido.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Ingresá tu contraseña.';
    } else if (password.length < 6) {
      nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Confirmá tu contraseña.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await register({
        nombre: name.trim(),
        email: email.trim(),
        password,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME_TABS }],
      });
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'No se pudo crear la cuenta.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      mode="register"
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      loading={loading}
      submitDisabled={submitDisabled}
      nameError={errors.name}
      emailError={errors.email}
      passwordError={errors.password}
      confirmPasswordError={errors.confirmPassword}
      error={errors.general}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onConfirmPasswordChange={handleConfirmPasswordChange}
      onSubmit={handleRegister}
      onSecondaryAction={() => navigation.navigate(ROUTES.LOGIN)}
    />
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}