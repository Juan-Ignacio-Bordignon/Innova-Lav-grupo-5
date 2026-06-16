import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AppButton, AppInput, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';

import MailIcon from '../../../assets/auth/mail.svg';
import LockIcon from '../../../assets/auth/lock.svg';
import EyeOffIcon from '../../../assets/auth/eye-off.svg';
import ProfileIcon from '../../../assets/auth/profile.svg';

const logoImage = require('../../../assets/auth/logo.png');

type AuthFormMode = 'login' | 'register';

type AuthFormProps = {
  mode: AuthFormMode;

  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;

  remember?: boolean;
  loading?: boolean;
  submitDisabled?: boolean;

  nameError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  error?: string;

  onNameChange?: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;

  onRememberChange?: (value: boolean) => void;
  onSubmit: () => void;
  onSecondaryAction: () => void;
  onForgotPassword?: () => void;
};

export function AuthForm({
  mode,
  name = '',
  email,
  password,
  confirmPassword = '',
  remember = false,
  loading = false,
  submitDisabled = false,
  nameError,
  emailError,
  passwordError,
  confirmPasswordError,
  error,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onRememberChange,
  onSubmit,
  onSecondaryAction,
  onForgotPassword,
}: AuthFormProps) {
  const isLogin = mode === 'login';

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isLogin && styles.scrollContentRegister,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, !isLogin && styles.containerRegister]}>
          <View
            style={[
              styles.logoContainer,
              !isLogin && styles.logoContainerRegister,
            ]}
          >
            <Image
              source={logoImage}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            {!isLogin ? (
              <AppInput
                placeholder="Ingresá tu nombre"
                value={name}
                onChangeText={onNameChange}
                error={nameError}
                textContentType="name"
                autoComplete="name"
                leftIcon={<ProfileIcon width={24} height={24} />}
              />
            ) : null}

            <AppInput
              placeholder="Ingresá tu email"
              keyboardType="email-address"
              value={email}
              onChangeText={onEmailChange}
              error={emailError}
              textContentType="emailAddress"
              autoComplete="email"
              leftIcon={<MailIcon width={24} height={24} />}
              containerStyle={!isLogin ? styles.inputSpacing : undefined}
            />

            <AppInput
              placeholder="Ingresá tu contraseña"
              secureTextEntry
              value={password}
              onChangeText={onPasswordChange}
              error={passwordError}
              textContentType={isLogin ? 'password' : 'newPassword'}
              autoComplete={isLogin ? 'password' : 'new-password'}
              leftIcon={<LockIcon width={24} height={24} />}
              passwordHiddenIcon={<EyeOffIcon width={24} height={24} />}
              passwordVisibleIcon={<EyeOffIcon width={24} height={24} />}
              containerStyle={styles.inputSpacing}
            />

            {!isLogin ? (
              <AppInput
                placeholder="Confirmá tu contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={onConfirmPasswordChange}
                error={confirmPasswordError}
                textContentType="newPassword"
                autoComplete="new-password"
                leftIcon={<LockIcon width={24} height={24} />}
                passwordHiddenIcon={<EyeOffIcon width={24} height={24} />}
                passwordVisibleIcon={<EyeOffIcon width={24} height={24} />}
                containerStyle={styles.inputSpacing}
              />
            ) : null}

            {isLogin ? (
              <View style={styles.loginOptions}>
                <View style={styles.rememberContainer}>
                  <RememberToggle
                    value={remember}
                    onChange={(value) => onRememberChange?.(value)}
                  />

                  <AppText variant="caption" style={styles.rememberText}>
                    Recordar
                  </AppText>
                </View>

                <AppText
                  variant="link"
                  onPress={onForgotPassword}
                  style={styles.forgotText}
                >
                  ¿Olvidaste tu contraseña?
                </AppText>
              </View>
            ) : null}

            {error ? (
              <AppText variant="error" style={styles.generalErrorText}>
                {error}
              </AppText>
            ) : null}

            <AppButton
              title={isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              loading={loading}
              disabled={submitDisabled}
              onPress={onSubmit}
              style={[
                styles.submitButton,
                !isLogin && styles.submitButtonRegister,
              ]}
            />

            <View style={styles.separator} />

            <AppText variant="caption" style={styles.secondaryText}>
              {isLogin ? '¿No estás registrado?' : '¿Ya tenés cuenta?'}
            </AppText>

            <AppButton
              title={isLogin ? 'Crear Cuenta' : 'Iniciar Sesión'}
              variant="outline"
              onPress={onSecondaryAction}
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type RememberToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function RememberToggle({ value, onChange }: RememberToggleProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={[styles.toggleTrack, value && styles.toggleTrackActive]}
    >
      <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentRegister: {
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 150,
    backgroundColor: colors.background,
  },
  containerRegister: {
    paddingTop: 90,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 62,
  },
  logoContainerRegister: {
    marginBottom: 38,
  },
  logo: {
    width: 285,
    height: 74,
  },
  formContainer: {
    width: '100%',
  },
  inputSpacing: {
    marginTop: 24,
  },
  loginOptions: {
    marginTop: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 10,
    color: colors.textPrimary,
  },
  forgotText: {
    fontSize: 12,
  },
  toggleTrack: {
    width: 42,
    height: 24,
    borderRadius: 20,
    backgroundColor: colors.disabled,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  generalErrorText: {
    marginTop: 16,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 24,
  },
  submitButtonRegister: {
    marginTop: 34,
  },
  separator: {
    width: '44%',
    height: 1,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 26,
    marginBottom: 14,
  },
  secondaryText: {
    textAlign: 'center',
    marginBottom: 14,
    color: colors.textPrimary,
  },
  secondaryButton: {
    width: '82%',
    alignSelf: 'center',
    borderRadius: 24,
  },
});