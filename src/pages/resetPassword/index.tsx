import React from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import useAppDispatch from '../../hooks/useAppDispatch';
import { requestPasswordReset } from '../../reducers/user';
import { errorToast, successToast } from '../../utils/customToast';
import { FloatingInput, SectionHeader } from '../registration/components';
import { styles } from './styles';

interface ResetPasswordFormData {
  email: string;
}

const validate = (values: ResetPasswordFormData) => {
  const errors: Partial<Record<keyof ResetPasswordFormData, string>> = {};

  if (!values.email.trim()) {
    errors.email = "L'adresse e-mail est requise.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Veuillez saisir une adresse e-mail valide.';
  }

  return errors;
};

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const initialValues: ResetPasswordFormData = {
    email: '',
  };

  const handleFormSubmit = (values: ResetPasswordFormData) => {
    dispatch(requestPasswordReset({ email: values.email }))
      .unwrap()
      .then((response) => {
        successToast(response?.message || `Un lien de reinitialisation a ete envoye a ${values.email}.`);
        navigation.goBack();
      })
      .catch(() => {
        errorToast('Impossible d\'envoyer le lien de reinitialisation. Veuillez reessayer.');
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
              <Text style={styles.brandTitle}>Reinitialiser</Text>
              <Text style={styles.brandSubtitle}>
                Saisissez votre e-mail pour recevoir un lien de reinitialisation du mot de passe.
              </Text>
            </View>

            <View style={styles.card}>
              <SectionHeader title="RECUPERATION DU MOT DE PASSE" />

              <FloatingInput
                label="Adresse e-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                required
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <Text style={styles.hint}>
                Verifiez aussi votre dossier spam si vous ne recevez pas l'e-mail dans quelques minutes.
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => submitForm()}
                activeOpacity={0.85}
              >
                <Text style={styles.continueBtnText}>ENVOYER LE LIEN →</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}
