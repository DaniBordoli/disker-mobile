import React from 'react';
import { View } from 'react-native';
import { BodyMStrong } from '../typography/BodyText';

export const CompletedSection: React.FC = () => {
  return (
    <View className="mb-6">
      <View 
        className="rounded-lg p-4"
        style={{
          backgroundColor: '#D3FAE0',
          borderWidth: 1,
          borderColor: '#20A05B'
        }}
      >
        <BodyMStrong className="text-primary-950">Finalizado</BodyMStrong>
      </View>
    </View>
  );
};
