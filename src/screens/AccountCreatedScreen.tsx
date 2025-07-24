import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StatusBar
} from 'react-native';
import { PrimaryButton } from '../components/buttons';

interface AccountCreatedScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'SocialMedia' | 'AccountCreated') => void;
}

export const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ onNavigate }) => {
  const handleContinue = () => {
  
    console.log('Account creation completed');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
     
      <View className="flex-1 items-center justify-center px-6">
    
        <View className="mb-12">
          <Image
            source={require('../public/LinkedAccount.png')}
            className="w-42 h-96"
            resizeMode="contain"
          />
        </View>

      
        <Text className="text-3xl font-bold text-black text-center mb-4">
          ¡Bienvenido a Diskerr!
        </Text>
        
        <Text className="text-gray-600 text-center text-base mb-8 px-8">
          Tu cuenta se creó con éxito 🎉 Ya podés descubrir campañas, postularte a oportunidades y empezar a monetizar tu contenido como creador.
        </Text>

    
        <View className="px-6 w-full">
          <PrimaryButton 
            title="Comenzar"
            variant="dark"
            onPress={handleContinue}
          />
        </View>
      </View>
    </View>
  );
};
