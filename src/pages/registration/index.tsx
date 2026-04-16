import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { successToast, errorToast } from '../../utils/customToast';

import useAppDispatch from '../../hooks/useAppDispatch';
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
            successToast('Votre réservation a été créée avec succès.');
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
            errorToast('Une erreur est survenue lors de la création de la réservation. Veuillez réessayer.');
        });
    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleFormSubmit}>
            {({ handleChange, handleBlur, handleSubmit: submitForm, values, setFieldValue, errors, touched, submitCount }) => (
                <SafeAreaView style={styles.safe}>
                    <View style={[styles.scroll, styles.backRow]}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backBtnText}>← Retour</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                    <StepIndicator />

                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid
                        extraHeight={120}
                    >
                        {/* Personal Details */}
                        <View style={styles.card}>
                            <SectionHeader title="VEUILLEZ FOURNIR LES INFORMATIONS PERSONNELLES DE L'ÉLÈVE" />
                            <FloatingInput label="Prénom" value={values.firstName} onChangeText={handleChange('firstName')} onBlur={handleBlur('firstName')} required />
                            {touched.firstName && errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
                            <FloatingInput label="Nom" value={values.lastName} onChangeText={handleChange('lastName')} onBlur={handleBlur('lastName')} required />
                            {touched.lastName && errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
                            <FloatingInput label="Adresse e-mail" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} keyboardType="email-address" required />
                            {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            <Text style={styles.hint}>Nous utilisons votre e-mail pour envoyer les détails de confirmation de la leçon.</Text>
                            <FloatingInput label="Téléphone" value={values.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} keyboardType="phone-pad" required />
                            {touched.phone && errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                        </View>

                        {/* Password */}
                        <View style={styles.card}>
                            <SectionHeader title="CHOISISSEZ UN MOT DE PASSE POUR LE TABLEAU DE BORD" />
                            <Text style={styles.hint}>
                                Votre tableau de bord vous permet de créer, gérer et consulter vos réservations en ligne 24h/24 et 7j/7.
                            </Text>
                            <FloatingInput label="Mot de passe" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry required />
                            {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            <FloatingInput label="Confirmer le mot de passe" value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} secureTextEntry required />
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
                                    J'accepte{' '}
                                    <Text style={styles.termsLink}>les conditions générales de Siya9ati</Text>
                                </Text>
                            </TouchableOpacity>
                            {submitCount > 0 && errors.agreed ? <Text style={styles.errorText}>{errors.agreed}</Text> : null}

                            <TouchableOpacity style={styles.continueBtn} onPress={() => submitForm()} activeOpacity={0.85}>
                                <Text style={styles.continueBtnText}>CONTINUER →</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            )}
        </Formik>
    );
}
