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
    !confirmPassword.trim();

  async function handleRegister() {
    const nextErrors: RegisterErrors = {};
    if (!name.trim()) nextErrors.name = 'Ingresá tu nombre.';
    if (!email.trim()) nextErrors.email = 'Ingresá tu email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = 'Ingresá un email válido.';
    if (!password.trim()) nextErrors.password = 'Ingresá tu contraseña.';
    else if (password.length < 6) nextErrors.password = 'Mínimo 6 caracteres.';
    if (!confirmPassword.trim()) nextErrors.confirmPassword = 'Confirmá tu contraseña.';
    else if (confirmPassword !== password)
      nextErrors.confirmPassword = 'Las contraseñas no coinciden.';
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    try {
      setLoading(true);
      setErrors({});
      await register({ name: name.trim(), email: email.trim(), password });
      navigation.reset({ index: 0, routes: [{ name: ROUTES.HOME_TABS }] });
    } catch (error) {
      setErrors({
        general:
          error instanceof Error ? error.message : 'No se pudo crear la cuenta.',
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
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleRegister}
      onSecondaryAction={() => navigation.navigate(ROUTES.LOGIN)}
    />
  );
}