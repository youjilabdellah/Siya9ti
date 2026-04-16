import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Formik } from 'formik';
import Svg, { Path } from 'react-native-svg';

import useAppDispatch from '../../hooks/useAppDispatch';
import { logoutUser, setUserInfo, UserSelectors } from '../../reducers/user';

const PencilIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20h9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { userInfo } = UserSelectors();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<Record<keyof typeof initialValues, string>> = {};

    if (!values.firstName.trim()) {
      errors.firstName = 'Le prenom est requis.';
    }
    if (!values.lastName.trim()) {
      errors.lastName = 'Le nom est requis.';
    }
    if (!values.email.trim()) {
      errors.email = "L'e-mail est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Adresse e-mail invalide.';
    }

    const normalizedPhone = values.phone.replace(/\s+/g, '');
    if (!normalizedPhone) {
      errors.phone = 'Le telephone est requis.';
    } else if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
      errors.phone = 'Numero de telephone invalide.';
    }

    return errors;
  };

  const handleSave = (values: typeof initialValues) => {
    dispatch(setUserInfo({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    }));

    setIsEditing(false);
    Keyboard.dismiss();
    Alert.alert('Profil mis a jour', 'Vos informations ont ete enregistrees.');
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={validate}
      onSubmit={handleSave}
      validateOnBlur
      validateOnChange
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isValid,
      }) => {
        const hasChanges =
          values.firstName !== (userInfo?.firstName || '') ||
          values.lastName !== (userInfo?.lastName || '') ||
          values.email !== (userInfo?.email || '') ||
          values.phone !== (userInfo?.phone || '');

        const handleToggleEdit = () => {
          if (isEditing) {
            resetForm();
            Keyboard.dismiss();
          }

          setIsEditing((prev) => !prev);
        };

        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.safe}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>Moi</Text>
                  <TouchableOpacity
                    style={[styles.editButton, isEditing && styles.editButtonActive]}
                    onPress={handleToggleEdit}
                    activeOpacity={0.8}
                  >
                    <PencilIcon color={isEditing ? '#FFFFFF' : '#1E2458'} />
                    <Text style={[styles.editText, isEditing && styles.editTextActive]}>
                      {isEditing ? 'Annuler' : 'Editer'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>Votre profil personnel</Text>

                <View style={styles.card}>
                  <Text style={styles.label}>Prenom</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    placeholder="Votre prenom"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                  {isEditing && touched.firstName && errors.firstName ? (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  ) : null}

                  <Text style={styles.label}>Nom</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    placeholder="Votre nom"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                  {isEditing && touched.lastName && errors.lastName ? (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  ) : null}

                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="nom@exemple.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={isEditing}
                  />
                  {isEditing && touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}

                  <Text style={styles.label}>Telephone</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    placeholder="06xxxxxxxx"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    editable={isEditing}
                  />
                  {isEditing && touched.phone && errors.phone ? (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      styles.saveButton,
                      (!hasChanges || !isEditing || !isValid) && styles.saveButtonDisabled,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => handleSubmit()}
                    disabled={!hasChanges || !isEditing || !isValid}
                  >
                    <Text style={styles.saveText}>Enregistrer</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.logoutButton}
                  activeOpacity={0.85}
                  onPress={() => dispatch(logoutUser())}
                >
                  <Text style={styles.logoutText}>Se deconnecter</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E2458',
  },
  editButton: {
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E2458',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
  },
  editText: {
    color: '#1E2458',
    fontSize: 12,
    fontWeight: '700',
  },
  editButtonActive: {
    backgroundColor: '#1E2458',
  },
  editTextActive: {
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  input: {
    marginTop: 6,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    color: '#111827',
    fontSize: 15,
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  errorText: {
    marginTop: 4,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 16,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#1E2458',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  logoutButton: {
    marginTop: 18,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E11D48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
