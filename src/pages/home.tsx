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

import Background from '../assets/background.png';
import Logo from '../assets/logo.png';

export default function HomeScreen() {
  const [mode, setMode] = useState('MANUAL');

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
          Find a driving instructor in your area.
        </Text>
        <Text style={styles.heroSubtitle}>
          Select your suburb to view driving lesson availability, pricing &
          to book online.
        </Text>
      </ImageBackground>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Find a Driving Instructor</Text>
        <Text style={styles.cardSubtitle}>
          Including availability, pricing & bookings
        </Text>

        {/* TOGGLE */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "AUTO" && styles.activeLeft,
            ]}
            onPress={() => setMode("AUTO")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "AUTO" && styles.activeText,
              ]}
            >
              AUTO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "MANUAL" && styles.activeRight,
            ]}
            onPress={() => setMode("MANUAL")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "MANUAL" && styles.activeText,
              ]}
            >
              MANUAL
            </Text>
          </TouchableOpacity>
        </View>

        {/* DROPDOWN */}
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Enter your suburb ▼</Text>
        </View>

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

  activeLeft: {
    backgroundColor: "#fff",
  },

  activeRight: {
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
