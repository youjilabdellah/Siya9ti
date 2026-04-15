import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { getCities, InstructorSelectors } from '../../reducers/instructor';


import Background from '../../assets/background.png';
import { styles } from './home.styles';
import useAppDispatch from '../../hooks/useAppDispatch';
import { City } from '../../types/core';

export default function HomeScreen() {
  const [city, setCity] = useState<City | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { cities } = InstructorSelectors();

  useEffect(() => {
    dispatch(getCities({}));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HERO */}
      <ImageBackground
        source={Background}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>
          Trouvez un moniteur d'auto-école dans votre ville.
        </Text>
        <Text style={styles.heroSubtitle}>
          Sélectionnez votre ville pour voir la disponibilité des leçons de conduite, les tarifs et réserver en ligne.
        </Text>
      </ImageBackground>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trouver un moniteur d'auto-école</Text>
        <Text style={styles.cardSubtitle}>
          Y compris les disponibilités, les tarifs et les réservations
        </Text>

        {/* DROPDOWN */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.placeholderStyle}
          containerStyle={styles.dropdownContainer}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={{}}
          data={cities as any}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Entrer votre ville'}
          searchPlaceholder="Search..."
          value={city}
          onChange={(item) => setCity(item as City)}
        />

        {/* BUTTON */}
        <TouchableOpacity
          style={{ ...styles.button, ...(!city ? styles.disabledButton : {}) }}
          onPress={() => {
            if (city) {
              navigation.navigate('Instructors', { city });
            }
          }}
          disabled={!city}
        >
          <Text style={styles.buttonText}>SEARCH NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
