import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BodyMStrong, BodyS, BodyMLink, BodyM } from '../typography/BodyText';
import { StatusBadge } from './StatusBadge';
import { ProgressStatus } from '../../types/progressStatus';

interface VideoHDSectionProps {
  videoHDUploaded: boolean;
  onUpload: () => void;
  onRemove: () => void;
  status?: ProgressStatus;
}

export const VideoHDSection: React.FC<VideoHDSectionProps> = ({ 
  videoHDUploaded, 
  onUpload, 
  onRemove,
  status = 'approved'
}) => {
  return (
    <View className="mb-6">
      {!videoHDUploaded ? (
       
        <View 
          className="border border-primary-950 rounded-lg p-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8, 
            backgroundColor: '#ffffff' 
          }}
        >
          <BodyMStrong className="text-primary-950 mb-3">Video en HD</BodyMStrong>
          <TouchableOpacity onPress={onUpload}>
            <BodyMLink className="text-primary-950">Subir video</BodyMLink>
          </TouchableOpacity>
        </View>
      ) : (
      
        <View className="border border-gray-200 rounded-lg p-4 bg-white">
          <View className="flex-row items-start justify-between mb-3">
            <BodyMStrong className="text-primary-950">Video en HD</BodyMStrong>
            <StatusBadge status={status} />
          </View>
          
       
          <View className="flex-row items-center mb-3 bg-gray-100 rounded-lg p-3">
            <View className="w-12 h-12 bg-gray-300 rounded mr-3 items-center justify-center">
              <Image 
                source={require('../../public/Icons/IconCheck.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <BodyM className="text-primary-950 font-medium">Video_HD.mp4</BodyM>
              <BodyS className="text-gray-500">8,7 MB</BodyS>
            </View>
          </View>
          
          <TouchableOpacity onPress={onRemove}>
            <BodyMLink className="text-primary-950">Cambiar video</BodyMLink>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
