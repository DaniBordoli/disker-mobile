import React, { useState } from 'react';
import { View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { FloatingLabelInput } from '../components/inputs';
import { PrimaryButton } from '../components/buttons';
import { LoadingOverlay } from '../components';

function isValidPhone(phone: string) {
  // Very basic validation: digits and +, 7-20 chars
  return /^\+?[0-9\s-]{7,20}$/.test(phone.trim());
}

type EditPhoneScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPhone'>;

const EditPhoneScreen: React.FC = () => {
  const navigation = useNavigation<EditPhoneScreenNavigationProp>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async () => {
    if (loading) return;
    const p = phone.trim();
    if (!isValidPhone(p)) {
      setErrorMsg('Ingresá un teléfono válido');
      return;
    }
    // TODO: Integrar con endpoint real cuando esté disponible
    Alert.alert('Próximamente', 'La edición de teléfono estará disponible en breve.');
    // navigation.goBack();
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
        <View className="w-8" />
      </View>

      <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">Editar teléfono</HeadingM>
      <BodyM className="text-primary-600 text-center text-base mb-8">
        Agregá o actualizá tu número de teléfono.
      </BodyM>

      <FloatingLabelInput
        label="Teléfono"
        value={phone}
        onChangeText={(t) => { setPhone(t); setErrorMsg(null); }}
        keyboardType="phone-pad"
      />

      {errorMsg ? (
        <BodyS className="text-red-600 mt-3 text-center">{errorMsg}</BodyS>
      ) : null}

      <View className="h-6" />
      <PrimaryButton
        title={loading ? 'Guardando...' : 'Guardar'}
        variant="dark"
        onPress={handleSave}
        disabled={loading}
      />

      <LoadingOverlay visible={loading} message="Guardando..." />
    </View>
  );
};

export default EditPhoneScreen;
