import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './comingSoon.styles';

export default function ComingSoonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring you something amazing. Stay tuned!
      </Text>
    </SafeAreaView>
  );
}
