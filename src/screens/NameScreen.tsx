import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { PrimaryButton } from '../components/buttons';
import { FloatingLabelInput } from '../components/inputs';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyMStrong } from '../components/typography/BodyText';

interface NameScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About') => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleContinue = () => {
    if (firstName.trim() && lastName.trim()) {
      console.log('Continue with name:', { firstName, lastName });
    
      onNavigate('Password');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
   
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity 
          className="w-8 h-8 items-center justify-center"
          onPress={() => onNavigate('Email')}
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
          <BodyMStrong className="text-gray-600 font-medium">2/5</BodyMStrong>
        </View>
      </View>

    
      <View className="flex-1">
        <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">
          ¿Cómo te llamás?
        </HeadingM>
        <BodyM className="text-primary-600 text-center text-base mb-8">
          Este será tu nombre visible para las marcas.
        </BodyM>

        <FloatingLabelInput
          label="Nombre"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <FloatingLabelInput
          label="Apellido"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </View>

      
      <PrimaryButton 
        title="Continuar"
        variant="dark"
        onPress={handleContinue}
      />
    </View>
  );
};
