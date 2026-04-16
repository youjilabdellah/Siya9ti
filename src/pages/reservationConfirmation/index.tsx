import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';

type ConfirmationRouteParams = {
  bookingId?: string;
  date?: string;
  selectedSlots?: string[];
  status?: 'pending' | 'confirmed' | 'cancelled';
};

const formatDate = (isoDate?: string) => {
  if (!isoDate) {
    return 'A confirmer';
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return parsed.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ReservationConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as ConfirmationRouteParams | undefined) ?? {};

  const status = params.status ?? 'pending';
  const dateLabel = formatDate(params.date);
  const slotsLabel = params.selectedSlots?.length ? params.selectedSlots.join(', ') : 'Aucun créneau transmis';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>⏳</Text>
          </View>

          <Text style={styles.title}>Réservation enregistrée</Text>
          <Text style={styles.subtitle}>
            Votre demande a bien été envoyée. Elle est en attente de validation par l&apos;instructeur.
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>STATUT: {status.toUpperCase()}</Text>
          </View>

          <Text style={styles.sectionTitle}>Détails de la réservation</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{dateLabel}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Créneaux</Text>
            <Text style={styles.detailValue}>{slotsLabel}</Text>
          </View>

          {params.bookingId ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Référence</Text>
              <Text style={styles.detailValue}>{params.bookingId}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => (navigation.navigate as any)('Home', { screen: 'reservations' })}
          >
            <Text style={styles.primaryButtonText}>Voir mes réservations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => (navigation.navigate as any)('Home', { screen: 'home' })}
          >
            <Text style={styles.secondaryButtonText}>Retour à l&apos;accueil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
