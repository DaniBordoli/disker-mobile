import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BodyMStrong, BodyMLink, BodyM } from '../typography/BodyText';
import { StatusBadge } from './StatusBadge';
import { ProgressStatus } from '../../types/progressStatus';

interface LinkSectionProps {
  linkUploaded: boolean;
  linkText: string;
  onShowModal: () => void;
  status?: ProgressStatus;
}

export const LinkSection: React.FC<LinkSectionProps> = ({ 
  linkUploaded, 
  linkText, 
  onShowModal,
  status = 'approved'
}) => {
  return (
    <View className="mb-6">
      {!linkUploaded ? (
    
        <View className="border border-primary-950 rounded-lg p-4 bg-white">
          <BodyMStrong className="text-primary-950 mb-3">Link</BodyMStrong>
          <TouchableOpacity onPress={onShowModal}>
            <BodyMLink className="text-primary-950">Subir link</BodyMLink>
          </TouchableOpacity>
        </View>
      ) : (
 
        <View className="border border-gray-200 rounded-lg p-4 bg-white">
          <View className="flex-row items-start justify-between mb-3">
            <BodyMStrong className="text-primary-950">Link</BodyMStrong>
            <StatusBadge status={status} />
          </View>
          
          {/* Link Preview */}
          <View className="flex-row items-center mb-3">
            <Image 
              source={require('../../public/MessageIcons/IconClipMessage.png')}
              className="w-6 h-6 mr-3"
              resizeMode="contain"
            />
            <View className="flex-1">
              <BodyM className="text-primary-950">{linkText.length > 50 ? linkText.substring(0, 50) + '...' : linkText}</BodyM>
            </View>
          </View>
          
          <TouchableOpacity onPress={onShowModal}>
            <BodyMLink className="text-primary-950">Cambiar link</BodyMLink>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
