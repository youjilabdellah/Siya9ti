import React, { useEffect } from 'react';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import useAppDispatch from '../../hooks/useAppDispatch';
import { cancelReservation, ReservationsSelectors, fetchMyReservations } from '../../reducers/reservations';
import { UserSelectors } from '../../reducers/user';
import { BookingResponse, MyReservation } from '../../types/booking';
import { successToast, errorToast } from '../../utils/customToast';
import { styles } from './styles';

const toDate = (value: string): Date | null => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value: string) => {
  const parsed = toDate(value);
  if (!parsed) {
    return value;
  }

  return parsed.toLocaleDateString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const isFutureBooking = (booking: MyReservation): boolean => {
  const parsed = toDate(booking.date);
  if (!parsed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parsed.getTime() > today.getTime();
};

const statusMeta = (status: BookingResponse['status']) => {
  if (status === 'confirmed') {
    return { label: 'CONFIRMEE', bg: '#ECFDF3', color: '#027A48' };
  }
  if (status === 'cancelled') {
    return { label: 'ANNULEE', bg: '#FEF2F2', color: '#B42318' };
  }
  return { label: 'EN ATTENTE', bg: '#FFFAEB', color: '#B54708' };
};

export default function ReservationsScreen() {
  const dispatch = useAppDispatch();
  const { myReservations } = ReservationsSelectors();
  const { userInfo } = UserSelectors();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
    if (!userInfo) {
      navigation.navigate('Login' as never);
      return;
    }
      dispatch(fetchMyReservations());
    }, [dispatch, userInfo, navigation])
  );

  const sortedBookings = React.useMemo(() => {
    const data = myReservations ?? [];

    return [...data].sort((a, b) => {
      const dateA = toDate(a.date)?.getTime() ?? 0;
      const dateB = toDate(b.date)?.getTime() ?? 0;
      return dateB - dateA;
    });
  }, [myReservations]);

  const handleCancel = (booking: MyReservation) => {
    Alert.alert(
      'Annuler la reservation',
      'Voulez-vous vraiment annuler cette reservation ?',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelReservation(booking.id))
              .unwrap()
              .then(() => {
                successToast('La reservation a ete annulee.');
              })
              .catch(() => {
                errorToast('Une erreur est survenue lors de l\'annulation de la reservation. Veuillez réessayer.');
              });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: MyReservation }) => {
    const meta = statusMeta(item.status);
    const canCancel = item.status !== 'cancelled' && isFutureBooking(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.bookingId}>Reservation #{item.id}</Text>
          <View style={[styles.badge, { backgroundColor: meta.bg }]}>
            <Text style={[styles.badgeText, { color: meta.color }]}>{meta.label}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Creneaux</Text>
          <Text style={styles.value}>{item.selectedSlots.join(', ') || '-'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Prix total</Text>
          <Text style={styles.value}>{item.totalPrice} MAD</Text>
        </View>

        {canCancel ? (
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.85}
            onPress={() => handleCancel(item)}
          >
            <Text style={styles.cancelButtonText}>Annuler la reservation</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.cancelledText}>
            {item.status === 'cancelled'
              ? 'Cette reservation est deja annulee.'
              : 'Annulation indisponible pour les reservations passees.'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes reservations</Text>
          <Text style={styles.subtitle}>Consultez le statut et gerez les reservations futures.</Text>
        </View>

        {sortedBookings.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>Aucune reservation</Text>
            <Text style={styles.emptyText}>
              Vos reservations apparaitront ici apres la confirmation de votre inscription.
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedBookings}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
