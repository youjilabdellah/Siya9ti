import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getInstructors, InstructorSelectors } from '../../reducers/instructor';
import InstructorCard from './components/instractorCard';
import { styles } from './instractors.styles';
import useAppDispatch from '../../hooks/useAppDispatch';
import { City } from '@/types/core';

export default function InstructorsScreen(): React.JSX.Element {
  const { instructors } = InstructorSelectors();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as { city?: City } | undefined;
  const city = params?.city;

  useEffect(() => {
    if (city) {
      dispatch(getInstructors({ city: city.value }));
    }
  }, [city, dispatch]);

  const onBookInstructor = (instructorId: string) => {
    // Naviguer vers l'écran de réservation avec l'instructeur sélectionné
    (navigation as any).navigate('Booking', { instructorId });
  };

  const onViewInstructorProfile = (instructorId: string) => {
    (navigation as any).navigate('InstructorProfile', { instructorId });
  };

  const renderInstructor = ({ item }: { item: any }) => (
    <InstructorCard
      name={item.name}
      title={`${item.city} - Note: ${item.rating} / 5`}
      badges={[
        { icon: '💰', label: `${item.pricePerHour} ${item.currency} / h` },
        // Ajouter plus de badges si nécessaire
      ]}
      onViewProfile={() => onViewInstructorProfile(item.id)}
      onBookOnline={() => onBookInstructor(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Instructeurs</Text>
        <Text style={styles.subtitle}>
          {city ? `Moniteurs à ${city.label}` : 'Affichez vos instructeurs disponibles et consultez leurs tarifs.'}
        </Text>
      </View>

      <FlatList
        data={instructors ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderInstructor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {city
                ? `Aucun instructeur trouvé pour ${city.label}.`
                : 'Aucun instructeur disponible pour le moment.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
