import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { HeadingM } from '../components/typography/Headings';
import { PrimaryButton } from '../components/buttons';
import { BodyM, BodyMStrong } from '../components/typography/BodyText';
import { FloatingLabelInput } from '../components/inputs';
import { VerifyEmailModal } from '../components/modal/VerifyEmailModal';

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
          className="w-8 h-8 items-center justify-center"
          onPress={() => onNavigate('Auth')}
        >
          <Image
            source={require('../public/Icons/IconGoback.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="items-center justify-center">
          <Image
            source={require('../public/Logo.png')}
            className="w-12 h-11"
            resizeMode="contain"
          />
        </View>
        
        <View className="w-8 items-center justify-center">
          <BodyMStrong className="text-gray-600 font-medium">1/5</BodyMStrong>
        </View>
      </View>

     
      <View className="flex-1">
        <HeadingM className='text-center text-primary-950 mb-2'>
          ¡Empecemos por tu email!
        </HeadingM>
        <BodyM className="text-primary-600 text-center mb-6">
          Así podremos crear tu cuenta en Diskerr.
        </BodyM>

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
