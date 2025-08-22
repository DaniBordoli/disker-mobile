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

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

type EditEmailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditEmail'>;

const EditEmailScreen: React.FC = () => {
  const navigation = useNavigation<EditEmailScreenNavigationProp>();
  const user = useAuthStore((s) => s.currentUser);
  const [email, setEmail] = useState<string>(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async () => {
    if (loading) return;
    const em = email.trim();
    if (!em || !isValidEmail(em)) {
      setErrorMsg('Ingresá un email válido');
      return;
    }
    // Backend endpoint no disponible aún: dejamos TODO y avisamos al usuario
    Alert.alert('Próximamente', 'La edición de email estará disponible en breve.');
    // Opcional: navigation.goBack();
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

      <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">Editar email</HeadingM>
      <BodyM className="text-primary-600 text-center text-base mb-8">
        Actualizá tu correo electrónico.
      </BodyM>

      <FloatingLabelInput
        label="Email"
        value={email}
        onChangeText={(t) => { setEmail(t); setErrorMsg(null); }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {errorMsg ? (
        <BodyS className="text-red-600 mt-3 text-center">{errorMsg}</BodyS>
      ) : null}

      <View className="h-24" />
      <View className="absolute left-0 right-0 bottom-0 px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <PrimaryButton
          title={'Guardar'}
          variant="dark"
          onPress={handleSave}
          disabled={loading}
        />
      </View>

      <LoadingOverlay visible={loading} message="Guardando..." />
    </View>
  );
};

export default EditEmailScreen;
