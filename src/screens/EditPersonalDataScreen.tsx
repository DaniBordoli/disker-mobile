import React, { useMemo, useState } from 'react';
import { View, Image, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { HeadingM, HeadingXS } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { PrimaryButton, SelectionButton } from '../components/buttons';
import { FloatingLabelInput, DateInput, SelectInput } from '../components/inputs';
import { CountryPickerModal } from '../components/modal/CountryPickerModal';
import { LoadingOverlay } from '../components';
import { setPersonalDataStep5 } from '../services/api';
import { useAuthStore } from '../store/auth';

// Optional param to focus a specific section when arriving from PersonalInfo
export type EditPersonalDataSection = 'gender' | 'birthdate' | 'location' | undefined;

type EditPersonalDataScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPersonalData'>;

type EditPersonalDataScreenRouteProp = RouteProp<RootStackParamList, 'EditPersonalData'>;

const EditPersonalDataScreen: React.FC = () => {
  const navigation = useNavigation<EditPersonalDataScreenNavigationProp>();
  const route = useRoute<EditPersonalDataScreenRouteProp>();
  const section = route.params?.section;
  const isGender = section === 'gender';
  const isBirthdate = section === 'birthdate';
  const isLocation = section === 'location';
  const user = useAuthStore((s) => s.currentUser);

  // We don't have persisted personal_data in store yet, so default to empty
  const [gender, setGender] = useState<'Masculino' | 'Femenino' | ''>('');
  const [birthDate, setBirthDate] = useState(''); // DD/MM/AAAA
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isUnderage = useMemo(() => {
    if (!birthDate || birthDate.length < 10) return false;
    const [day, month, year] = birthDate.split('/').map(Number);
    if (!day || !month || !year) return false;
    const today = new Date();
    const d = new Date(year, month - 1, day);
    let age = today.getFullYear() - d.getFullYear();
    const md = today.getMonth() - d.getMonth();
    if (md < 0 || (md === 0 && today.getDate() < d.getDate())) age--;
    return age < 18;
  }, [birthDate]);

  const isFormValid = (
    isGender ? Boolean(gender) :
    isBirthdate ? Boolean(birthDate) && !isUnderage :
    isLocation ? Boolean(country) && Boolean(city) :
    Boolean(gender && birthDate && country && city && !isUnderage)
  );

  const handleSave = async () => {
    if (loading) return;
    if (!user?.id) {
      setErrorMsg('No se encontró el usuario en sesión.');
      return;
    }
    if (!isFormValid) {
      setErrorMsg('Completá todos los campos válidos.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      const payload: any = { set_personal_data: {} };
      if (isGender || !section) {
        const apiGender = gender === 'Masculino' ? 'male' : 'female';
        if (gender) payload.set_personal_data.gender = apiGender as 'male' | 'female';
      }
      if (isBirthdate || !section) {
        if (birthDate) payload.set_personal_data.birthdate = birthDate.replaceAll('/', '-');
      }
      if (isLocation || !section) {
        if (country) payload.set_personal_data.country = country;
        if (city) payload.set_personal_data.city_uid = 1; // TODO: map city -> UID
      }
      await setPersonalDataStep5(user.id, payload);
      navigation.goBack();
    } catch (e: any) {
      if (e?.status === 422) {
        setErrorMsg('Validación fallida. Revisá los datos e intentá de nuevo.');
      } else {
        setErrorMsg(e?.message || 'No pudimos guardar tus datos. Probá más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-row items-center justify-between mb-8 px-6 pt-12">
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

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">
          {isGender ? 'Editar género' : isBirthdate ? 'Editar fecha de nacimiento' : isLocation ? 'Editar ubicación' : 'Editar datos personales'}
        </HeadingM>
        <BodyM className="text-primary-600 text-center text-base mb-8">
          {isGender ? 'Actualizá tu género.' : isBirthdate ? 'Actualizá tu fecha de nacimiento.' : isLocation ? 'Actualizá tu país y ciudad.' : 'Actualizá tu género, fecha de nacimiento y ubicación.'}
        </BodyM>

        {/* Gender */}
        {(!section || isGender) && (
          <>
            <HeadingXS className="text-primary-950 font-medium text-base mb-4">Género</HeadingXS>
            <View className="flex-row mb-6">
              <View className="w-auto">
                <SelectionButton
                  title="Masculino"
                  icon={require('../public/Icons/MasculineEmoji.png')}
                  isSelected={gender === 'Masculino'}
                  onPress={() => setGender('Masculino')}
                />
              </View>
              <View className="w-4" />
              <View className="w-auto">
                <SelectionButton
                  title="Femenino"
                  icon={require('../public/Icons/FemenineEmoji.png')}
                  isSelected={gender === 'Femenino'}
                  onPress={() => setGender('Femenino')}
                />
              </View>
            </View>
          </>
        )}

        {/* Birthdate */}
        {(!section || isBirthdate) && (
          <>
            <HeadingXS className="text-primary-950 font-medium text-base mb-4">Fecha de nacimiento</HeadingXS>
            <DateInput label="DD/MM/AAAA" value={birthDate} onChangeText={setBirthDate} />
            <BodyS className={`text-sm mb-6 ${isUnderage ? 'text-red-600' : 'text-primary-950'}`}>
              {isUnderage ? 'Tenés que ser mayor de 18 años' : 'Debés tener al menos 18 años para registrarte.'}
            </BodyS>
          </>
        )}

        {/* Location */}
        {(!section || isLocation) && (
          <>
            <HeadingXS className="text-primary-950 font-medium text-base mb-4">Soy de</HeadingXS>
            <SelectInput
              label="País"
              value={country}
              placeholder="País"
              onPress={() => setShowCountryModal(true)}
              className="mb-4"
            />
            <FloatingLabelInput label="Ciudad" value={city} onChangeText={setCity} className="pb-8" />
          </>
        )}

        {errorMsg ? <BodyS className="text-red-600 mt-3 text-center">{errorMsg}</BodyS> : null}
        <View className="h-24" />
      </ScrollView>

      <View className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <PrimaryButton title={loading ? 'Guardando...' : 'Guardar'} variant="dark" onPress={handleSave} disabled={loading} />
      </View>

      {(!section || isLocation) && (
        <CountryPickerModal visible={showCountryModal} onClose={() => setShowCountryModal(false)} onSelect={setCountry} selectedCountry={country} />
      )}
      <LoadingOverlay visible={loading} message="Guardando datos..." />
    </View>
  );
};

export default EditPersonalDataScreen;
