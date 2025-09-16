import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { PrimaryButton, SocialButton } from '../components/buttons';
import { BodyLLink, BodyM } from '../components/typography/BodyText';
import { signInWithGoogle } from '../services/google';
import { loginWithGoogleSession } from '../services/api';
import { LoadingOverlay } from '../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../store/auth';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const handleGoogle = React.useCallback(async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      const res = await signInWithGoogle();
      console.log('[GoogleLogin] signIn result', res);
      if (!res?.idToken) {
        setGoogleLoading(false);
        return;
      }
      const apiRes = await loginWithGoogleSession(res.idToken);
      console.log('[GoogleLogin] API response', apiRes);
      // Navigate after successful login; store listeners will also react
      try {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } catch {}
    } catch (e) {
      console.log('[GoogleLogin] error', e);
    } finally {
      setGoogleLoading(false);
    }
  }, [googleLoading, navigation]);

  

  const handleGoogleDisconnect = React.useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('[GoogleLogin] disconnect: start');
    try {
      await GoogleSignin.revokeAccess();
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] revokeAccess: ok');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] revokeAccess: failed', e);
    }
    try {
      await GoogleSignin.signOut();
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] signOut: ok');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] signOut: failed', e);
    }
    try {
      await useAuthStore.getState().clearSession();
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] local session cleared');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] local session clear failed', e);
    }
    try {
      Alert.alert('Google', 'Se desconectó la cuenta. Vuelve a iniciar sesión para elegir otra.');
    } catch {}
    // eslint-disable-next-line no-console
    console.log('[GoogleLogin] disconnect: done');
  }, []);

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
          onPress={() => navigation.navigate('Email')}
        />

     
        

        <SocialButton 
          title={googleLoading ? 'Conectando…' : 'Continuar con Google'}
          provider="google"
          icon={<Image source={require('../public/SignUpImages/googleLogo.png')} className="w-5 h-5" resizeMode="contain" />}
          onPress={handleGoogle}
          disabled={googleLoading}
        />

        <TouchableOpacity
          className="items-center mt-2"
          onPress={handleGoogleDisconnect}
        >
          <BodyLLink className="text-primary-950 underline">Desconectar Google (cambiar de cuenta)</BodyLLink>
        </TouchableOpacity>

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
          onPress={() => navigation.navigate('Login')}
        >
          <BodyLLink className="text-primary-950 font-medium text-lg underline" onPress={() => navigation.navigate('Login')}>
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
      <LoadingOverlay visible={googleLoading} message={googleLoading ? 'Conectando con Google...' : ''} />
    </View>
  );
};
