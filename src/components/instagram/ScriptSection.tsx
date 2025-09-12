import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { BodyMStrong, BodyM } from '../typography/BodyText';
import { StatusBadge } from './StatusBadge';
import { ProgressStatus } from '../../types/progressStatus';

interface ScriptSectionProps {
  status?: ProgressStatus;
  hasScript?: boolean; 
  onScriptSubmitted?: () => void; 
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ScriptSection: React.FC<ScriptSectionProps> = ({ 
  status = 'approved',
  hasScript = true, 
  onScriptSubmitted
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewHistory = () => {
    navigation.navigate('ScriptHistory');
  };

  const handleAddScript = () => {
    navigation.navigate('AddScript', { onScriptSubmitted });
  };
  return (
    <View className="mb-6">
      <View className="border border-gray-200 rounded-lg p-4 bg-white">
        <View className="flex-row items-start justify-between mb-4">
          <BodyMStrong className="text-primary-950">Guión</BodyMStrong>
          {hasScript && <StatusBadge status={status} />}
        </View>
        
     
        {!hasScript ? (
         
          <TouchableOpacity
            className="w-3/4 py-5 px-6 rounded-xl items-center justify-center"
            style={{ backgroundColor: '#191919' }}
            onPress={handleAddScript}
          >
            <BodyM className="text-white font-semibold">Agregar guión</BodyM>
          </TouchableOpacity>
        ) : (
         
          <View className="flex-row justify-center space-x-3">
            <TouchableOpacity 
              className="w-36 py-3 mr-6 px-4 bg-white border border-neutral-300 rounded-lg items-center justify-center"
              onPress={handleViewHistory}
            >
              <BodyM className="text-primary-950">Ver historial</BodyM>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-36 py-3 px-4 bg-white border border-neutral-300 rounded-lg items-center justify-center">
              <BodyM className="text-primary-950">Ver guión</BodyM>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
