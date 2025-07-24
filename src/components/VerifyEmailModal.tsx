import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput as RNTextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

interface VerifyEmailModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => void;
}

export const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  visible,
  email,
  onClose,
  onVerify
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(252); 
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  useEffect(() => {
    if (visible && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, timeLeft]);

  useEffect(() => {
    if (visible) {
    
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [visible]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

     
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onVerify(fullCode);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl px-6 py-8 w-full">
            
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-black">
                Verificá tu email
              </Text>
              <TouchableOpacity onPress={onClose} className="p-1">
                <Text className="text-2xl text-gray-400">×</Text>
              </TouchableOpacity>
            </View>

           
            <Text className="text-gray-600 text-base mb-1">
              Ingresá el código que enviamos a tu correo
            </Text>
            <Text className="text-black font-medium mb-8">
              {email}
            </Text>

         
            <View className="flex-row justify-center gap-3 mb-6">
              {code.map((digit, index) => (
                <RNTextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className="w-16 h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-bold text-black bg-white"
                  value={digit}
                  onChangeText={(value) => handleCodeChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

          
            <Text className="text-center text-gray-600 mb-8 text-base">
              Expira en: <Text className="font-medium text-black">{formatTime(timeLeft)}</Text>
            </Text>

            
            <TouchableOpacity 
              className={`py-4 rounded-xl mb-6 ${
                isCodeComplete 
                  ? 'bg-black' 
                  : 'bg-gray-200'
              }`}
              onPress={handleVerify}
              disabled={!isCodeComplete}
            >
              <Text className={`text-center font-semibold text-base ${
                isCodeComplete 
                  ? 'text-white' 
                  : 'text-gray-400'
              }`}>
                Validar cuenta
              </Text>
            </TouchableOpacity>

           
            <TouchableOpacity className="items-center">
              <Text className="text-black text-base">
                <Text className="text-gray-600 underline">¿No recibiste el código? </Text>
                <Text className="underline font-medium">Reenviar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
