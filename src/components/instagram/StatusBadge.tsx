import React from 'react';
import { View } from 'react-native';
import { BodyS } from '../typography/BodyText';
import { ProgressStatus, STATUS_CONFIG } from '../../types/progressStatus';

interface StatusBadgeProps {
  status: ProgressStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  
  return (
    <View className={`${config.bgColor} px-3 py-1 rounded-lg`}>
      <BodyS className={`${config.textColor} font-medium`}>{config.label}</BodyS>
    </View>
  );
};
