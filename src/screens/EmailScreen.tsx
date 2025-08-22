import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { PrimaryButton } from '../components/buttons';
import { BodyM, BodyMStrong } from '../components/typography/BodyText';
import { FloatingLabelInput } from '../components/inputs';
import { VerifyEmailModal } from '../components/modal/VerifyEmailModal';
import { LoadingOverlay } from '../components';
import { registerUserStep1, confirmEmailStep2, scheduleProactiveRefresh } from '../services/api';
import { useAuthStore, persistUser } from '../store/auth';

type EmailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Email'>;

export const EmailScreen: React.FC = () => {
  const navigation = useNavigation<EmailScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleContinue = async () => {
    if (loading) return;
    const trimmed = email.trim();
    if (!trimmed) return;
    setErrorMsg(null);
    setLoading(true);
    try {
      await registerUserStep1({ user: { email: trimmed } });
      // Abrir modal para ingresar el código recibido por email
      setShowVerifyModal(true);
    } catch (e: any) {
      // Manejo de validación 422 y otros errores
      if (e?.status === 422) {
        const emailErrors = e?.body?.errors?.email as unknown;
        if (Array.isArray(emailErrors) && emailErrors.includes('has already been taken')) {
          setErrorMsg('Este email ya está registrado. Probá con otro o iniciá sesión.');
        } else {
          setErrorMsg('Validación fallida. Revisá el email e intentá de nuevo.');
        }
      } else {
        const msg = e?.message || 'Ocurrió un error. Intentá nuevamente más tarde.';
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (loading) return;
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await confirmEmailStep2(code);
      const rawId = (res as any)?.data?.user?.id;
      const userId = typeof rawId === 'number' ? rawId : Number(rawId);
      if (!Number.isFinite(userId)) {
        setErrorMsg('No se pudo confirmar el usuario. Intentá nuevamente.');
        return;
      }
      // Persistir tokens y usuario si vienen en la respuesta
      const access = (res as any)?.data?.access_token as string | undefined;
      const refresh = (res as any)?.data?.refresh_token as string | undefined;
      const user = (res as any)?.data?.user as any | undefined;
      try {
        if (access || refresh) {
          await useAuthStore.getState().setTokens({ accessToken: access || null, refreshToken: refresh || null });
        }
        if (user && typeof user === 'object') {
          // Map mínimo al tipo AuthUser
          const mapped = { id: user.id, email: user.email, name: user.name ?? null, role: user.role ?? null };
          useAuthStore.getState().setCurrentUser(mapped);
          await persistUser(mapped);
        }
        // Programar refresh proactivo según exp del JWT
        scheduleProactiveRefresh();
      } catch {}
      setShowVerifyModal(false);
      navigation.navigate({ name: 'Name', params: { userId } } as any);
    } catch (e: any) {
      const msg = e?.message as string | undefined;
      if (msg === 'Email already confirmed') {
        setErrorMsg('Este email ya fue confirmado. Podés continuar con el registro.');
      } else if (e?.status === 422 || e?.status === 400) {
        setErrorMsg('Código inválido o expirado. Revisá tu correo e intentá de nuevo.');
      } else {
        setErrorMsg(msg || 'No pudimos confirmar tu email. Probá más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
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
          <BodyMStrong className="text-gray-600 font-medium">1/5</BodyMStrong>
        </View>
      </View>

     
      <View className="flex-1">
        <HeadingM className='text-center text-primary-950 mb-2'>
          ¡Empecemos por tu email!
        </HeadingM>
        <BodyM className="text-primary-600 text-center mb-6">
          Así podremos crear tu cuenta en Diskerr.
        </BodyM>

        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {errorMsg ? (
          <BodyM className="text-red-600 mt-3 text-center">{errorMsg}</BodyM>
        ) : null}
      </View>

    
      <PrimaryButton 
        title={loading ? 'Enviando...' : 'Continuar'}
        variant="dark"
        onPress={handleContinue}
        disabled={loading}
      />

    
      <VerifyEmailModal
        visible={showVerifyModal}
        email={email}
        onClose={handleCloseModal}
        onVerify={handleVerify}
      />
      <LoadingOverlay visible={loading} message="Procesando..." />
    </View>
  );
};
