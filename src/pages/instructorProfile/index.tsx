import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getInstructorDetails, InstructorSelectors } from '../../reducers/instructor';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Instructor } from '../../types/instructor';
import { styles } from './styles';

type InstructorProfileParams = {
  instructorId?: string;
};

const buildFeatures = (instructor: Instructor) => {
  const packageCount = instructor.packages?.length ?? 0;

  return [
    {
      title: 'Cours dans votre ville',
      description: `${instructor.name} intervient a ${instructor.city} avec une tarification claire des la premiere heure.`,
    },
    {
      title: 'Reservation simple',
      description: 'Choisissez un creneau disponible, confirmez votre reservation et poursuivez le parcours depuis l application.',
    },
    {
      title: 'Formules disponibles',
      description: packageCount > 0
        ? `${packageCount} formule${packageCount > 1 ? 's' : ''} de conduite sont proposees pour adapter le volume d heures a votre besoin.`
        : 'La reservation a l heure reste disponible pour organiser vos seances librement.',
    },
  ];
};

export default function InstructorProfileScreen(): React.JSX.Element {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { instructorDetails } = InstructorSelectors();
  const route = useRoute();
  const { instructorId } = (route.params as InstructorProfileParams) || {};

  useEffect(() => {
    if (instructorId) {
      dispatch(getInstructorDetails({ instructorId }));
    }
  }, [dispatch, instructorId]);

  const instructor = instructorDetails;

  if (!instructorId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>ID introuvable</Text>
          <Text style={styles.emptyText}>
            Aucun identifiant instructeur n a ete transmis a cette page.
          </Text>
          <TouchableOpacity
            style={[styles.bookButton, styles.emptyActionButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.bookButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!instructor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Chargement du profil...</Text>
          <Text style={styles.emptyText}>
            Recuperation des details de l instructeur.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const initials = instructor.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');
  const features = buildFeatures(instructor);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <View style={styles.heroCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials || 'IN'}</Text>
            </View>
            <Text style={styles.name}>{instructor.name}</Text>
            <Text style={styles.headline}>
              Moniteur a {instructor.city}. Consultez ses tarifs, ses formules et poursuivez vers la reservation en ligne.
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{instructor.rating.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Note</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{instructor.pricePerHour}</Text>
                <Text style={styles.statLabel}>{instructor.currency} / heure</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{instructor.packages?.length ?? 0}</Text>
                <Text style={styles.statLabel}>Formules</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A propos</Text>
          <Text style={styles.sectionText}>
            Ce profil rassemble les informations essentielles pour comparer les instructeurs avant de choisir un creneau de conduite.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points forts</Text>
          {features.map(feature => (
            <View key={feature.title} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureText}>{feature.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarifs et formules</Text>
          <View style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingHours}>1 heure</Text>
              <Text style={styles.pricingValue}>{instructor.pricePerHour} {instructor.currency}</Text>
            </View>
            <Text style={styles.pricingHint}>Tarif horaire standard pour une reservation individuelle.</Text>
          </View>

          {instructor.packages?.map(pkg => (
            <View key={`${pkg.hours}-${pkg.price}`} style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Text style={styles.pricingHours}>{pkg.hours} heures</Text>
                <Text style={styles.pricingValue}>{pkg.price} {instructor.currency}</Text>
              </View>
              <Text style={styles.pricingHint}>
                Soit {(pkg.price / pkg.hours).toFixed(0)} {instructor.currency} par heure sur cette formule.
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.stickyFooter}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('Booking', { instructorId: instructor.id })}
            activeOpacity={0.85}
          >
            <Text style={styles.bookButtonText}>Reserver avec cet instructeur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
