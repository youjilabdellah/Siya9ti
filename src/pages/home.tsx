import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getCities, InstructorSelectors } from '../reducers/instructor';


import Background from '../assets/background.png';
import Logo from '../assets/logo.png';
import { styles } from './home.styles';
import useAppDispatch from '../hooks/useAppDispatch';

export default function HomeScreen() {
  const [city, setCity] = useState(null);
  const dispatch = useAppDispatch();
  const { cities } = InstructorSelectors();

  useEffect(() => {
    dispatch(getCities({}));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* HERO */}
      <ImageBackground
        source={Background}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>
          Trouvez un moniteur d’auto-école dans votre ville.
        </Text>
        <Text style={styles.heroSubtitle}>
          Sélectionnez votre ville pour voir la disponibilité des leçons de conduite, les tarifs et réserver en ligne.
        </Text>
      </ImageBackground>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trouver un moniteur d’auto-école</Text>
        <Text style={styles.cardSubtitle}>
          Y compris les disponibilités, les tarifs et les réservations
        </Text>

        {/* DROPDOWN */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.placeholderStyle}
          inputSearchStyle={{}}
          iconStyle={{}}
          data={cities}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Entrer votre ville'}
          searchPlaceholder="Search..."
          value={city}
          onChange={(item) => setCity(item.value)}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEARCH NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
