import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  backdropOpacity?: number; // 0..1
  spinnerColor?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  backdropOpacity = 0.35,
  spinnerColor = '#111827', // primary-950 fallback
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${backdropOpacity})` }]}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={spinnerColor} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 140,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 10,
    color: '#111827',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoadingOverlay;
