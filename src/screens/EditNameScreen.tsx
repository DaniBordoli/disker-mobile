import React, { useState } from 'react';
import { View, Image, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { FloatingLabelInput } from '../components/inputs';
import { PrimaryButton } from '../components/buttons';
import { LoadingOverlay } from '../components';
import { useAuthStore } from '../store/auth';
import { setUserNamesStep4 } from '../services/api';

type EditNameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditName'>;

const EditNameScreen: React.FC = () => {
  const navigation = useNavigation<EditNameScreenNavigationProp>();
  const user = useAuthStore((s) => s.currentUser);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);

  const [firstName, setFirstName] = useState<string>(() => {
    const name = user?.name || '';
    // If name is "First Last", split. Otherwise keep as is.
    const parts = name.trim().split(' ');
    return parts.length > 1 ? parts.slice(0, -1).join(' ') : name;
  });
  const [lastName, setLastName] = useState<string>(() => {
    const name = user?.name || '';
    const parts = name.trim().split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async () => {
    if (loading) return;
    const f = firstName.trim();
    const l = lastName.trim();
    if (!f || !l) {
      setErrorMsg('Completá nombre y apellido');
      return;
    }
    if (!user?.id) {
      Alert.alert('Error', 'No se encontró el usuario en sesión.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      await setUserNamesStep4(user.id, { set_names: { name: f, lastname: l } });
      // Update store name locally
      const full = `${f} ${l}`.trim();
      setCurrentUser({ ...(user as any), name: full });
      navigation.goBack();
    } catch (e: any) {
      if (e?.status === 422) {
        setErrorMsg('Validación fallida. Revisá los datos e intentá de nuevo.');
      } else {
        setErrorMsg(e?.message || 'No pudimos actualizar el nombre. Probá más tarde.');
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
        <View className="w-8" />
      </View>

      <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">Editar nombre</HeadingM>
      <BodyM className="text-primary-600 text-center text-base mb-8">
        Actualizá tu nombre y apellido.
      </BodyM>

      <FloatingLabelInput
        label="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />
      <View className="h-4" />
      <FloatingLabelInput
        label="Apellido"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />

      {errorMsg ? (
        <BodyS className="text-red-600 mt-3 text-center">{errorMsg}</BodyS>
      ) : null}

      <View className="h-24" />
      <View className="absolute left-0 right-0 bottom-0 px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <PrimaryButton
          title={loading ? 'Guardando...' : 'Guardar'}
          variant="dark"
          onPress={handleSave}
          disabled={loading}
        />
      </View>

      <LoadingOverlay visible={loading} message="Guardando..." />
    </View>
  );
};

export default EditNameScreen;
