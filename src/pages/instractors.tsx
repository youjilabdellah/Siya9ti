import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getInstructors, InstructorSelectors } from '../reducers/instructor';
import { styles } from './instractors.styles';
import useAppDispatch from '../hooks/useAppDispatch';

export default function InstructorsScreen(): React.JSX.Element {
  const { instructors } = InstructorSelectors();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const params = route.params as { city?: string } | undefined;
  const city = params?.city;

  useEffect(() => {
    if (city) {
      dispatch(getInstructors({ city }));
    }
  }, [city, dispatch]);

  const renderInstructor = ({ item }: { item: any }) => (
    <View style={styles.instructorCard}>
      <Text style={styles.instructorName}>{item.name}</Text>
      <Text style={styles.instructorMeta}>{item.city}</Text>
      <Text style={styles.instructorMeta}>Note: {item.rating} / 5</Text>
      <Text style={styles.instructorPrice}>
        {item.pricePerHour} {item.currency} / h
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Instructeurs</Text>
        <Text style={styles.subtitle}>
          {city ? `Moniteurs à ${city}` : 'Affichez vos instructeurs disponibles et consultez leurs tarifs.'}
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
                ? `Aucun instructeur trouvé pour ${city}.`
                : 'Aucun instructeur disponible pour le moment.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
