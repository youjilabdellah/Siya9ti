import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import useAppDispatch from '../../hooks/useAppDispatch';
import useTranslation from '../../hooks/useTranslation';
import { fetchUserInfo } from '../../reducers/user';
import { errorToast } from '../../utils/customToast';
import { getFcmToken } from '../../services/notifications';

import { FloatingInput, SectionHeader } from '../registration/components';
import { styles } from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginFormData {
    email: string;
    password: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const validate = (values: LoginFormData, t: any) => {
    const errors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!values.email.trim()) {
        errors.email = t.login.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = t.login.emailInvalid;
    }

    if (!values.password.trim()) {
        errors.password = t.login.passwordRequired;
    }

    return errors;
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const initialValues: LoginFormData = {
        email: '',
        password: '',
    };

    const handleFormSubmit = (values: LoginFormData) => {
        dispatch(fetchUserInfo({ email: values.email, password: values.password }))
            .unwrap()
            .then(async () => {
                const fcmToken = await getFcmToken();
                console.log('FCM Token:', fcmToken);
                navigation.goBack();
            }).catch(() => {
                errorToast(t.login.credentialsError);
            });
    };

    return (
        <Formik initialValues={initialValues} validate={(values) => validate(values, t)} onSubmit={handleFormSubmit}>
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
                        {/* Back button */}
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => (navigation.navigate as any)('Home')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backBtnText}>{t.login.backButton}</Text>
                        </TouchableOpacity>

                        {/* Logo / Brand */}
                        <View style={styles.brandContainer}>
                            <Text style={styles.brandTitle}>{t.login.brand}</Text>
                            <Text style={styles.brandSubtitle}>{t.login.subtitle}</Text>
                        </View>

                        {/* Credentials Card */}
                        <View style={styles.card}>
                            <SectionHeader title={t.login.sectionHeader} />

                            <FloatingInput
                                label={t.login.emailLabel}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                                required
                            />
                            {touched.email && errors.email ? (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            ) : null}

                            <FloatingInput
                                label={t.login.passwordLabel}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                                required
                            />
                            {touched.password && errors.password ? (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            ) : null}

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => (navigation.navigate as any)('ResetPassword')}
                            >
                                <Text style={styles.forgotPassword}>{t.login.forgotPassword}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Submit */}
                        <View style={styles.bottomSection}>
                            <TouchableOpacity
                                style={styles.continueBtn}
                                onPress={() => submitForm()}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.continueBtnText}>{t.login.signInButton}</Text>
                            </TouchableOpacity>

                            <View style={styles.registerRow}>
                                <Text style={styles.registerText}>{t.login.registerPrompt}</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => (navigation.navigate as any)('Registration')}
                                >
                                    <Text style={styles.registerLink}>{t.login.registerLink}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            )}
        </Formik>
    );
}
