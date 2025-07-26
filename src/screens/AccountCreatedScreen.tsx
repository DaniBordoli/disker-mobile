import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StatusBar
} from 'react-native';
import { PrimaryButton } from '../components/buttons';
import { HeadingL } from '../components/typography/Headings';
import { BodyM } from '../components/typography/BodyText';

interface AccountCreatedScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'SocialMedia' | 'AccountCreated' | 'Home') => void;
}

export const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ onNavigate }) => {
  const handleContinue = () => {
    console.log('Account creation completed');
    onNavigate('Home');
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

      
        <HeadingL className="text-3xl font-bold text-primary-950 text-center mb-4">
          ¡Bienvenido a Disker!
        </HeadingL>

        <BodyM className="text-primary-600 text-center text-base mb-8 px-8">
          Tu cuenta se creó con éxito 🎉 Ya podés descubrir campañas, postularte a oportunidades y empezar a monetizar tu contenido como creador.
        </BodyM>

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
