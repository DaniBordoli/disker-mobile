import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { PrimaryButton } from '../components/buttons';
import { FloatingLabelInput } from '../components/inputs';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyMStrong, BodyS } from '../components/typography/BodyText';
import { setUserNamesStep4 } from '../services/api';
import { LoadingOverlay } from '../components';

type NameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Name'>;

export const NameScreen: React.FC = () => {
  const navigation = useNavigation<NameScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Name'>>();
  const { userId } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContinue = async () => {
    let hasError = false;
    
    if (!firstName.trim()) {
      setFirstNameError(true);
      hasError = true;
    } else {
      setFirstNameError(false);
    }
    
    if (!lastName.trim()) {
      setLastNameError(true);
      hasError = true;
    } else {
      setLastNameError(false);
    }
    
    if (hasError || loading) return;

    setSubmitError(null);
    setLoading(true);
    try {
      console.log('[SetNames] request', { userId, name: firstName.trim(), lastname: lastName.trim() });
      const resp = await setUserNamesStep4(userId, { set_names: { name: firstName.trim(), lastname: lastName.trim() } });
      console.log('[SetNames] response', resp);
      navigation.navigate({ name: 'Password', params: { userId } } as any);
    } catch (e: any) {
      console.log('[SetNames] error', e);
      if (e?.status === 422) {
        setSubmitError('Validación fallida. Revisá los datos e intentá de nuevo.');
      } else {
        setSubmitError(e?.message || 'Ocurrió un error. Intentá nuevamente más tarde.');
      }
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
          onChangeText={(text) => {
            setFirstName(text);
            if (text.trim()) setFirstNameError(false);
          }}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {firstNameError && (
          <BodyS className="text-red-600 mb-2 flex-row items-center">
            <Image
              source={require('../public/Icons/IconWarning.png')}
              className="w-4 h-4 mr-1"
              style={{ tintColor: '#DC2626' }}
              resizeMode="contain"
            />
            {' '}Ingresa tu nombre
          </BodyS>
        )}

        <FloatingLabelInput
          label="Apellido"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            if (text.trim()) setLastNameError(false);
          }}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {lastNameError && (
          <BodyS className="text-red-600 mb-2 flex-row items-center">
            <Image
              source={require('../public/Icons/IconWarning.png')}
              className="w-4 h-4 mr-1"
              style={{ tintColor: '#DC2626' }}
              resizeMode="contain"
            />
            {' '}Ingresa tu apellido
          </BodyS>
        )}
      </View>

      
      <PrimaryButton 
        title={loading ? 'Guardando...' : 'Continuar'}
        variant="dark"
        onPress={handleContinue}
      />
      {submitError ? (
        <BodyS className="text-red-600 mt-3 text-center">{submitError}</BodyS>
      ) : null}
      <LoadingOverlay visible={loading} message="Guardando..." />
    </View>
  );
};
