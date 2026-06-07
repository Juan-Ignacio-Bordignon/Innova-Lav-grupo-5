import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';

import { AppButton, AppInput, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';

type AuthFormMode = 'login' | 'register';

type AuthFormProps = {
  mode: AuthFormMode;

  email: string;
  password: string;
  confirmPassword?: string;

  remember?: boolean;
  loading?: boolean;
  error?: string;

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
  email,
  password,
  confirmPassword = '',
  remember = false,
  loading = false,
  error,
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
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logoText}>
              con
              <AppText style={styles.logoAccent}>=</AppText>
              tacto
            </AppText>
          </View>

          <View style={styles.formContainer}>
            <AppInput
              placeholder="Ingresá tu email"
              keyboardType="email-address"
              value={email}
              onChangeText={onEmailChange}
              textContentType="emailAddress"
              autoComplete="email"
            />

            <AppInput
              placeholder="Ingresá tu contraseña"
              secureTextEntry
              value={password}
              onChangeText={onPasswordChange}
              textContentType={isLogin ? 'password' : 'newPassword'}
              autoComplete={isLogin ? 'password' : 'new-password'}
              containerStyle={styles.inputSpacing}
            />

            {!isLogin ? (
              <AppInput
                placeholder="Confirmá tu contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={onConfirmPasswordChange}
                textContentType="newPassword"
                autoComplete="new-password"
                containerStyle={styles.inputSpacing}
              />
            ) : null}

            {isLogin ? (
              <View style={styles.loginOptions}>
                <View style={styles.rememberContainer}>
                  <Switch
                    value={remember}
                    onValueChange={onRememberChange}
                    trackColor={{
                      false: colors.border,
                      true: colors.primary,
                    }}
                    thumbColor={colors.white}
                  />

                  <AppText variant="caption" style={styles.rememberText}>
                    recordar
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
              <AppText variant="error" style={styles.errorText}>
                {error}
              </AppText>
            ) : null}

            <AppButton
              title={isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              loading={loading}
              onPress={onSubmit}
              style={styles.submitButton}
            />

            <View style={styles.separator} />

            <AppText variant="caption" style={styles.secondaryText}>
              {isLogin ? '¿No estás registrado?' : '¿Ya tenés cuenta?'}
            </AppText>

            <AppButton
              title={isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
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

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 42,
    lineHeight: 50,
    color: colors.primary,
    letterSpacing: 1,
  },
  logoAccent: {
    color: colors.secondary,
    fontSize: 34,
  },
  formContainer: {
    width: '100%',
  },
  inputSpacing: {
    marginTop: 16,
  },
  loginOptions: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 12,
  },
  errorText: {
    marginTop: 16,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 58,
    borderRadius: 28,
  },
  separator: {
    width: '55%',
    height: 1,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 26,
    marginBottom: 14,
  },
  secondaryText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    width: '65%',
    alignSelf: 'center',
    borderRadius: 28,
  },
});