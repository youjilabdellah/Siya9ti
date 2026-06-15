import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { successToast, errorToast } from '../../utils/customToast';

import useAppDispatch from '../../hooks/useAppDispatch';
import useTranslation from '../../hooks/useTranslation';
import { setUserInfo } from '../../reducers/user';
import { createBooking } from '../../reducers/reservations';

import {
    StepIndicator,
    FloatingInput,
    SectionHeader,
    type FormData,
} from './components';
import { styles } from './styles';
// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function RegistrationScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as { instructorId: string, selectedSlots: string[], currentDate: Date } | undefined;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const initialValues: FormData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreed: false,
    };

    const validate = (values: FormData) => {
        const errors: Partial<Record<keyof FormData, string>> = {};

        if (!values.firstName.trim()) {
            errors.firstName = 'Le prénom est requis.';
        }
        if (!values.lastName.trim()) {
            errors.lastName = 'Le nom est requis.';
        }
        if (!values.email.trim()) {
            errors.email = 'L’adresse e-mail est requise.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Veuillez saisir une adresse e-mail valide.';
        }
        if (!values.phone.trim()) {
            errors.phone = 'Le téléphone est requis.';
        }
        if (!values.password.trim()) {
            errors.password = 'Le mot de passe est requis.';
        }
        if (!values.confirmPassword.trim()) {
            errors.confirmPassword = 'La confirmation du mot de passe est requise.';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }
        if (!values.agreed) {
            errors.agreed = 'Vous devez accepter les conditions générales.';
        }

        return errors;
    };

    const handleFormSubmit = (values: FormData) => {
        dispatch(createBooking({
            instructorId: params?.instructorId || '',
            selectedSlots: params?.selectedSlots || [],
            date: params?.currentDate.toISOString().split('T')[0] || '',
            user: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
                agreed: values.agreed,
            },
        }))
        .unwrap()
        .then((booking) => {
            successToast(t.registration.successToast);
            dispatch(setUserInfo({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
            }));
            (navigation.navigate as any)('ReservationConfirmation', {
                bookingId: booking?.id,
                date: booking?.date,
                selectedSlots: booking?.selectedSlots,
                status: booking?.status || 'pending',
            });
        })
        .catch(() => {
            errorToast(t.registration.errorToast);
        });
    };

    return (
        <Formik initialValues={initialValues} validate={(values) => validate(values, t)} onSubmit={handleFormSubmit}>
            {({ handleChange, handleBlur, handleSubmit: submitForm, values, setFieldValue, errors, touched, submitCount }) => (
                <SafeAreaView style={styles.safe}>
                    <View style={[styles.scroll, styles.backRow]}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backBtnText}>{t.registration.backButton}</Text>
                        </TouchableOpacity>
                    </View>
                    {   params?.selectedSlots &&
                        <>
                            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                            <StepIndicator />
                        </>
                     }

                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid
                        extraHeight={120}
                    >
                        {/* Personal Details */}
                        <View style={styles.card}>
                            <SectionHeader title={t.registration.personalInfoHeader} />
                            <FloatingInput label={t.registration.firstNameLabel} value={values.firstName} onChangeText={handleChange('firstName')} onBlur={handleBlur('firstName')} required />
                            {touched.firstName && errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
                            <FloatingInput label={t.registration.lastNameLabel} value={values.lastName} onChangeText={handleChange('lastName')} onBlur={handleBlur('lastName')} required />
                            {touched.lastName && errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
                            <FloatingInput label={t.registration.emailLabel} value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} keyboardType="email-address" required />
                            {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            <Text style={styles.hint}>{t.registration.emailHint}</Text>
                            <FloatingInput label={t.registration.phoneLabel} value={values.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} keyboardType="phone-pad" required />
                            {touched.phone && errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                        </View>

                        {/* Password */}
                        <View style={styles.card}>
                            <SectionHeader title={t.registration.passwordSectionHeader} />
                            <Text style={styles.hint}>
                                {t.registration.passwordHint}
                            </Text>
                            <FloatingInput label={t.registration.passwordLabel} value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry required />
                            {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            <FloatingInput label={t.registration.confirmPasswordLabel} value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} secureTextEntry required />
                            {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                        </View>

                        {/* Terms & Continue */}
                        <View style={styles.bottomSection}>
                            <TouchableOpacity
                                style={styles.checkRow}
                                onPress={() => setFieldValue('agreed', !values.agreed)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, values.agreed && styles.checkboxChecked]}>
                                    {values.agreed && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.termsText}>
                                    {t.registration.termsCheckbox}
                                </Text>
                            </TouchableOpacity>
                            {submitCount > 0 && errors.agreed ? <Text style={styles.errorText}>{errors.agreed}</Text> : null}

                            <TouchableOpacity style={styles.continueBtn} onPress={() => submitForm()} activeOpacity={0.85}>
                                <Text style={styles.continueBtnText}>{t.registration.continueButton}</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            )}
        </Formik>
    );
}
