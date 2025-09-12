import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { BodyMStrong, BodyMLink } from '../typography/BodyText';
import { StatusBadge } from './StatusBadge';
import { AudienceStatsFile } from '../../types/audienceStats';
import { ProgressStatus } from '../../types/progressStatus';

interface MetricsSectionProps {
  metricsFile: AudienceStatsFile | null;
  onUpload: () => void;
  onRemove: () => void;
  status?: ProgressStatus;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ 
  metricsFile, 
  onUpload, 
  onRemove,
  status = 'pending'
}) => {
  return (
    <View className="mb-6">
      {!metricsFile ? (
        <View className="border border-gray-200 rounded-lg p-4 bg-white">
          <View className="flex-row items-start justify-between mb-3">
            <BodyMStrong className="text-primary-950">Métricas</BodyMStrong>
            <StatusBadge status={status} />
          </View>
          <TouchableOpacity onPress={onUpload}>
            <BodyMLink className="text-primary-950">Subir métricas</BodyMLink>
          </TouchableOpacity>
        </View>
      ) : (
       
        <View className="border border-gray-200 rounded-lg p-4 bg-white">
          <View className="flex-row items-start justify-between mb-3">
            <BodyMStrong className="text-primary-950">Métricas</BodyMStrong>
            <StatusBadge status={status} />
          </View>
          
       
          <View className="mb-3">
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 mb-2">
              {metricsFile.uri ? (
                <Image 
                  source={{ uri: metricsFile.uri }} 
                  className="w-12 h-12 rounded-xl mr-3" 
                  resizeMode="cover"
                />
              ) : (
                <View className="w-12 h-12 bg-gray-200 rounded-xl mr-3" />
              )}
              <View className="flex-1">
                <Text className="text-primary-950 font-medium mb-1">{metricsFile.name}</Text>
                {metricsFile.uploading ? (
                  <>
                    <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                      <View style={{ width: `${metricsFile.progress}%` }} className="h-1.5 bg-violet-500 rounded-full" />
                    </View>
                    <Text className="text-xs text-gray-500">
                      Subiendo... {metricsFile.progress}% ({(metricsFile.size * metricsFile.progress / 100 / (1024 * 1024)).toFixed(1)} MB de {(metricsFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </Text>
                  </>
                ) : (
                  <Text className="text-xs text-gray-500">
                    {(metricsFile.size / (1024 * 1024)).toFixed(1)} MB
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={onRemove} className="ml-2">
                <Image 
                  source={require('../../public/Icons/IconClose.png')}
                  className="w-5 h-5"
                  style={{ tintColor: '#9CA3AF' }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity onPress={onUpload}>
            <BodyMLink className="text-primary-950">Cambiar métricas</BodyMLink>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
