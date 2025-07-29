import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { PrimaryButton, SocialButton } from '../components/buttons';
import { BodyLLink, BodyM } from '../components/typography/BodyText';

interface AuthScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'Home' | 'AudienceStats') => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate }) => {
  return (
    <View className="flex-1 bg-white px-6 pt-16 pb-8">
      
      <View className="absolute top-0 left-0 right-0 flex-row justify-between px-8 z-0">
        <View className="bg-white overflow-hidden shadow-sm opacity-90">
          <Image 
            source={require('../public/SignUpImages/Container1.png')} 
          />
        </View>
        <View className="bg-white overflow-hidden shadow-sm opacity-90">
          <Image 
            source={require('../public/SignUpImages/Container2.png')} 
          />
        </View>
        <View className="bg-white overflow-hidden shadow-sm opacity-90">
          <Image 
            source={require('../public/SignUpImages/Container3.png')} 
          />
        </View>
      </View>


      <Image
        source={require('../public/SignUpImages/backgroundShape.png')}
        className="absolute bottom-80 left-8 right-0 w-full h-full z-5"
        resizeMode="cover"
      />

  
      <View className="flex-1" />

    
      <View className="items-center mb-8 z-10">
        <Image 
          source={require('../public/Logotype.png')} 
          className="w-64 h-24 mb-8"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-center text-primary-950 mb-1">
          La plataforma para creadores
        </Text>
        <Text className="text-2xl font-bold text-center text-primary-950">
          con marcas reales.
        </Text>
      </View>

    
      <View>
      
        <PrimaryButton 
          title="Crear cuenta gratis"
          variant="dark"
          onPress={() => onNavigate('AudienceStats')}
        />

     
        <SocialButton 
          title="Continuar con Tiktok"
          provider="tiktok"
          icon={<Image source={require('../public/SignUpImages/tiktokLogo.png')} className="w-5 h-5" resizeMode="contain" />}
          onPress={() => console.log('TikTok login')}
        />

        <SocialButton 
          title="Continuar con Google"
          provider="google"
          icon={<Image source={require('../public/SignUpImages/googleLogo.png')} className="w-5 h-5" resizeMode="contain" />}
          onPress={() => console.log('Google login')}
        />

        <SocialButton 
          title="Continuar con Instagram"
          provider="instagram"
          icon={<Image source={require('../public/SignUpImages/instagramLogo.png')} className="w-5 h-5" resizeMode="contain" />}
          onPress={() => console.log('Instagram login')}
        />

        <SocialButton 
          title="Continuar con Apple"
          provider="apple"
          icon={<Image source={require('../public/SignUpImages/appleLogo.png')} className="w-5 h-5" resizeMode="contain" />}
          onPress={() => console.log('Apple login')}
        />

       
        <TouchableOpacity 
          className="items-center mt-4"
          onPress={() => console.log('Ya tengo cuenta')}
        >
          <BodyLLink className="text-primary-950 font-medium text-lg underline">
            Ya tengo cuenta
          </BodyLLink>
        </TouchableOpacity>

        
        <View className="mt-8">
          <BodyM className="text-base text-primary-600 text-center leading-5">
            Al continuar, aceptas nuestro{' '}
            <Text className="underline">Acuerdo del usuario</Text> y{'\n'}
            confirmas que has entendido la{' '}
            <Text className="underline">Política de privacidad</Text>.
          </BodyM>
        </View>
      </View>
    </View>
  );
};
