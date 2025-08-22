import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { FloatingLabelInput } from '../components/inputs';
import { LoadingOverlay } from '../components';
import { PrimaryButton } from '../components/buttons';
import { loginSession } from '../services/api';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (loading) return;
    const em = email.trim();
    if (!em || !password) {
      setErrorMsg('Ingresá tu email y contraseña');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await loginSession({ email: em, password });
      console.log('[EmailLogin] API raw response', res);
      const data: any = (res as any)?.data;
      console.log('[EmailLogin] parsed data', data);
      const user = data?.user;
      const userId: number | undefined = user?.id;
      const steps = user?.signup_steps || {};
      console.log('[EmailLogin] user', user);
      console.log('[EmailLogin] steps', steps);
      if (userId && steps) {
        if (steps.step_password === false) {
          navigation.replace('Password', { userId });
          return;
        }
        if (steps.step_set_names === false) {
          navigation.replace('Name', { userId });
          return;
        }
        if (steps.step_personal_data === false) {
          navigation.replace('About', { userId });
          return;
        }
      }
      navigation.replace('Home');
    } catch (e: any) {
      console.log('[EmailLogin] error', e);
      let msg: string = e?.message || 'Error al iniciar sesión';
      if (msg === 'Invalid email or password') {
        msg = 'Email o clave incorrecta.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity 
          className="w-8 h-8 items-center justify-center"
          onPress={() => navigation.goBack()}
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
            className="w-12 h-11 mt-2"
            resizeMode="contain"
          />
        </View>
        
        <View className="w-8 items-center justify-center" />
      </View>

      <View className="mt-8">
        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View className="h-4" />
        <FloatingLabelInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        {errorMsg ? (
          <Text className="text-red-600 mt-2">{errorMsg}</Text>
        ) : null}
        <View className="h-6" />
        <PrimaryButton 
          title={loading ? 'Ingresando...' : 'Ingresar'} 
          variant="dark"
          onPress={handleSubmit} 
          disabled={loading} 
        />
        <TouchableOpacity className="items-center mt-4" onPress={() => navigation.goBack()}>
          <Text className="text-primary-950 underline">Volver</Text>
        </TouchableOpacity>
      </View>

      <LoadingOverlay visible={loading} message="Ingresando..." />
    </View>
  );
};
