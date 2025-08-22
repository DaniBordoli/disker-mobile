import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { PrimaryButton } from '../components/buttons';
import { FloatingLabelInput } from '../components/inputs';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyS, BodyMStrong } from '../components/typography/BodyText';
import { setUserPasswordStep3 } from '../services/api';
import { LoadingOverlay } from '../components';

type PasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Password'>;

interface ValidationRule {
  text: string;
  isValid: boolean;
}

export const PasswordScreen: React.FC = () => {
  const navigation = useNavigation<PasswordScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Password'>>();
  const { userId } = route.params;
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validations, setValidations] = useState<ValidationRule[]>([
    { text: 'Fuerza de la contraseña: aún no evaluada', isValid: false },
    { text: 'Debe tener al menos 8 caracteres', isValid: false },
    { text: 'No puede incluir tu nombre o dirección de correo electrónico', isValid: false },
    { text: 'Debe tener al menos un símbolo o número', isValid: false },
    { text: 'No puede contener espacios', isValid: false },
  ]);

  useEffect(() => {
    const newValidations = [...validations];
    
    
    if (password.length === 0) {
      newValidations[0] = { text: 'Fuerza de la contraseña: aún no evaluada', isValid: false };
    } else if (password.length < 6) {
      newValidations[0] = { text: 'Fuerza de la contraseña: débil', isValid: false };
    } else {
      newValidations[0] = { text: 'Fuerza de la contraseña: fuerte', isValid: true };
    }
    
   
    newValidations[1] = {
      text: 'Debe tener al menos 8 caracteres',
      isValid: password.length >= 8
    };
    
 
    newValidations[2] = {
      text: 'No puede incluir tu nombre o dirección de correo electrónico',
      isValid: true 
    };
    
   
    const hasSymbolOrNumber = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    newValidations[3] = {
      text: 'Debe tener al menos un símbolo o número',
      isValid: hasSymbolOrNumber
    };
    
   
    newValidations[4] = {
      text: 'No puede contener espacios',
      isValid: !password.includes(' ')
    };
    
    setValidations(newValidations);
  }, [password]);

  const handleContinue = async () => {
    const allValid = validations.every(validation => validation.isValid);
    if (allValid && password.trim()) {
      if (submitting) return;
      setSubmitError(null);
      setSubmitting(true);
      try {
        await setUserPasswordStep3(userId, { set_password: { password: password.trim() } });
        navigation.navigate({ name: 'About', params: { userId } });
      } catch (e: any) {
        if (e?.status === 422) {
          setSubmitError('Validación fallida. Revisá tu contraseña e intentá de nuevo.');
        } else {
          setSubmitError(e?.message || 'No pudimos guardar tu contraseña. Probá más tarde.');
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  const allValidationsPass = validations.every(validation => validation.isValid);

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
        
        <View className="w-8 items-center justify-center">
          <BodyMStrong className="text-gray-600 font-medium">3/5</BodyMStrong>
        </View>
      </View>


      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2 px-2">
          Lautaro, vamos a crear una clave segura para tu cuenta
        </HeadingM>
        <BodyM className="text-primary-600 text-center text-base px-8 mb-8">
          Esto te va a ayudar a mantener tu perfil protegido.
        </BodyM>

      
        <FloatingLabelInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          className={`${
            password.length > 0 && !allValidationsPass 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 bg-white'
          }`}
        />

       
        <View className="my-2 pb-8">
          {validations.map((validation, index) => (
            <View key={index} className="flex-row items-center ml-2 mb-4">
              {password.length === 0 ? (
               
                <View className="w-4 h-4 rounded-full bg-gray-300 mr-3" />
              ) : (
              
                <View className="w-4 h-4 mr-3 items-center justify-center">
                  <Image
                    source={
                      index === 0 
                        ? require('../public/Icons/IconShield.png')
                        : validation.isValid
                          ? require('../public/Icons/IconCheck.png')
                          : require('../public/Icons/IconClose.png')
                    }
                    className="w-4 h-4"
                    style={{
                      tintColor: index === 0 
                        ? (validation.isValid ? '#22C55E' : '#EF4444') 
                        : (validation.isValid ? '#000000' : '#EF4444') 
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
              <BodyS className={`text-sm ${
                password.length === 0 
                  ? 'text-primary-600' 
                  : index === 0 
                    ? (validation.isValid ? 'text-green-600' : 'text-red-600') 
                    : (validation.isValid ? 'text-black' : 'text-red-600') 
              }`}>
                {validation.text}
              </BodyS>
            </View>
          ))}
        </View>
      </ScrollView>

     
      <View className="px-6 pb-8 bg-white">
        <PrimaryButton 
          title={submitting ? 'Guardando...' : 'Continuar'}
          variant="dark"
          onPress={handleContinue}
          disabled={submitting}
        />
        {submitError ? (
          <BodyS className="text-red-600 mt-3 text-center">{submitError}</BodyS>
        ) : null}
      </View>
      <LoadingOverlay visible={submitting} message="Guardando contraseña..." />
    </View>
  );
};
