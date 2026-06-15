import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTranslation from '../../hooks/useTranslation';
import { styles } from './comingSoon.styles';

export default function ComingSoonScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t.comingSoon.title}</Text>
      <Text style={styles.subtitle}>
        {t.comingSoon.subtitle}
      </Text>
    </SafeAreaView>
  );
}
