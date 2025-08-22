import React, { useState } from 'react';
import { View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { FloatingLabelInput } from '../components/inputs';
import { PrimaryButton } from '../components/buttons';
import { LoadingOverlay } from '../components';
import { useAuthStore } from '../store/auth';
import { setUserPasswordStep3 } from '../services/api';

function validatePassword(pass: string): string | null {
  if (pass.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
  return null;
}

type EditPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPassword'>;

const EditPasswordScreen: React.FC = () => {
  const navigation = useNavigation<EditPasswordScreenNavigationProp>();
  const user = useAuthStore((s) => s.currentUser);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async () => {
    if (loading) return;
    const p = password.trim();
    const c = confirm.trim();
    const validation = validatePassword(p);
    if (validation) {
      setErrorMsg(validation);
      return;
    }
    if (p !== c) {
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }
    if (!user?.id) {
      setErrorMsg('No se encontró el usuario en sesión.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      await setUserPasswordStep3(user.id, { set_password: { password: p } });
      navigation.goBack();
    } catch (e: any) {
      if (e?.status === 422) {
        setErrorMsg('Validación fallida. Revisá los datos e intentá de nuevo.');
      } else {
        setErrorMsg(e?.message || 'No pudimos actualizar la contraseña. Probá más tarde.');
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

      <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">Cambiar contraseña</HeadingM>
      <BodyM className="text-primary-600 text-center text-base mb-8">
        Ingresá tu nueva contraseña.
      </BodyM>

      <FloatingLabelInput
        label="Nueva contraseña"
        value={password}
        onChangeText={(t) => { setPassword(t); setErrorMsg(null); }}
        secureTextEntry
      />
      <View className="h-4" />
      <FloatingLabelInput
        label="Confirmar contraseña"
        value={confirm}
        onChangeText={(t) => { setConfirm(t); setErrorMsg(null); }}
        secureTextEntry
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

export default EditPasswordScreen;
