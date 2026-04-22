import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import useAppDispatch from '../../hooks/useAppDispatch';
import { confirmPasswordReset } from '../../reducers/user';
import { errorToast, successToast } from '../../utils/customToast';
import { FloatingInput, SectionHeader } from '../registration/components';
import { styles } from './styles';

interface NewPasswordFormData {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

const validate = (values: NewPasswordFormData) => {
  const errors: Partial<Record<keyof NewPasswordFormData, string>> = {};

  if (!values.resetToken.trim()) {
    errors.resetToken = 'Le code de reinitialisation est requis.';
  }

  if (!values.newPassword.trim()) {
    errors.newPassword = 'Le mot de passe est requis.';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Le mot de passe doit contenir au moins 8 caracteres.';
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = 'La confirmation du mot de passe est requise.';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }

  return errors;
};

export default function NewPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  
  const routeParams = route.params as { token?: string } | undefined;
  const tokenFromLink = routeParams?.token || '';

  const initialValues: NewPasswordFormData = {
    resetToken: tokenFromLink,
    newPassword: '',
    confirmPassword: '',
  };

  const handleFormSubmit = (values: NewPasswordFormData) => {
    dispatch(confirmPasswordReset({
      resetToken: values.resetToken,
      newPassword: values.newPassword,
    }))
      .unwrap()
      .then((response) => {
        successToast(response?.message || 'Mot de passe reinitialise avec succes.');
        (navigation.navigate as any)('Login');
      })
      .catch(() => {
        errorToast('Impossible de reinitialiser le mot de passe. Veuillez verifier le code et reessayer.');
      });
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleFormSubmit}>
      {({ handleChange, handleBlur, handleSubmit: submitForm, values, errors, touched }) => (
        <SafeAreaView style={styles.safe}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />

          <KeyboardAwareScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraHeight={120}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backBtnText}>← Retour</Text>
            </TouchableOpacity>

            <View style={styles.brandContainer}>
              <Text style={styles.brandTitle}>Nouveau Mot de Passe</Text>
              <Text style={styles.brandSubtitle}>
                Saisissez le code que vous avez recu et definissez votre nouveau mot de passe.
              </Text>
            </View>

            <View style={styles.card}>
              <SectionHeader title="CONFIRMATION ET NOUVEAU MOT DE PASSE" />

              <FloatingInput
                label="Code de reinitialisation"
                value={values.resetToken}
                onChangeText={handleChange('resetToken')}
                onBlur={handleBlur('resetToken')}
                required
              />
              {touched.resetToken && errors.resetToken ? (
                <Text style={styles.errorText}>{errors.resetToken}</Text>
              ) : null}

              <FloatingInput
                label="Nouveau mot de passe"
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                secureTextEntry
                required
              />
              {touched.newPassword && errors.newPassword ? (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              ) : null}

              <FloatingInput
                label="Confirmer le mot de passe"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                required
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}

              <Text style={styles.hint}>
                Utilisez au moins 8 caracteres avec des lettres et des chiffres pour plus de securite.
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => submitForm()}
                activeOpacity={0.85}
              >
                <Text style={styles.continueBtnText}>CONFIRMER LE MOT DE PASSE →</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}
