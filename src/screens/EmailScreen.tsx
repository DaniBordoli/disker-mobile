import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { PrimaryButton } from '../components/buttons';
import { FloatingLabelInput } from '../components/inputs';
import { VerifyEmailModal } from '../components/VerifyEmailModal';

interface EmailScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About') => void;
}

export const EmailScreen: React.FC<EmailScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handleContinue = () => {
    if (email.trim()) {
      setShowVerifyModal(true);
    }
  };

  const handleVerify = (code: string) => {
    console.log('Verification code:', code);
    setShowVerifyModal(false);
  
    onNavigate('Name');
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
     
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center"
          onPress={() => onNavigate('Auth')}
        >
          <Image
            source={require('../public/Icons/IconGoback.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="items-center justify-center">
          <Image
            source={require('../public/Logo.png')}
            className="w-12 h-10"
            resizeMode="contain"
          />
        </View>
        
        <Text className="text-gray-600 font-medium">1/5</Text>
      </View>

     
      <View className="flex-1">
        <Text className="text-2xl text-center font-bold text-black mb-2">
          ¡Empecemos por tu email!
        </Text>
        <Text className="text-gray-600 text-center text-base mb-8">
          Así podremos crear tu cuenta en Disker.
        </Text>

        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

    
      <PrimaryButton 
        title="Continuar"
        variant="dark"
        onPress={handleContinue}
      />

    
      <VerifyEmailModal
        visible={showVerifyModal}
        email={email}
        onClose={handleCloseModal}
        onVerify={handleVerify}
      />
    </View>
  );
};
