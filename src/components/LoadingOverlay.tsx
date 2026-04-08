import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  size?: 'small' | 'large';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  size = 'large',
}) => {
  if (!visible) {
    return null;
}

  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />
      <View style={styles.content}>
        <ActivityIndicator
          size={size}
          color="#FFFFFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
