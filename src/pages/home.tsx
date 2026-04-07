import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Background from '../assets/background.png';
import Logo from '../assets/logo.png';

const CITIES = [
    { label: 'Rabat', value: '1' },
    { label: 'Casablanca', value: '2' },
    { label: 'Safi', value: '3' }
  ];

export default function HomeScreen() {
  const [city, setCity] = useState(null);

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
          selectedTextStyle={{}}
          inputSearchStyle={{}}
          iconStyle={{}}
          data={CITIES}
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

const PRIMARY = "#1E2458";
const YELLOW = "#F7C600";

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: PRIMARY,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  logo: {
    height: 70,
    transform: [{ translateX: -50 }]
  },

  menu: {
    fontSize: 24,
  },

  hero: {
    padding: 20,
    height: 250,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  heroSubtitle: {
    color: "#ddd",
    fontSize: 14,
  },

  carImage: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: YELLOW,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY,
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 15,
  },

  toggleContainer: {
    flexDirection: "row",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: YELLOW,
    marginBottom: 15,
  },

  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#eee",
  },

  active: {
    backgroundColor: YELLOW,
  },

  toggleText: {
    fontWeight: "bold",
    color: "#333",
  },

  activeText: {
    color: "#000",
  },

  dropdown: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },

  dropdownText: {
    color: "#777",
  },

  button: {
    backgroundColor: YELLOW,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
  },
});
