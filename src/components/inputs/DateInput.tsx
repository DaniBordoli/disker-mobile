import React, { useState, useRef } from 'react';
import { 
  TextInput as RNTextInput, 
  View, 
  Text, 
  Animated, 
  TextInputProps,
  TouchableWithoutFeedback 
} from 'react-native';

interface DateInputProps extends Omit<TextInputProps, 'placeholder' | 'keyboardType'> {
  label: string;
  error?: string;
}

export const DateInput: React.FC<DateInputProps> = ({ 
  label, 
  error,
  value,
  onFocus,
  onBlur,
  onChangeText,
  className,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<RNTextInput>(null);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const formatDate = (text: string) => {
   
    const numbers = text.replace(/\D/g, '');
    
   
    let formatted = numbers;
    if (numbers.length >= 2) {
      formatted = numbers.slice(0, 2) + '/' + numbers.slice(2);
    }
    if (numbers.length >= 4) {
      formatted = numbers.slice(0, 2) + '/' + numbers.slice(2, 4) + '/' + numbers.slice(4, 8);
    }
    
    return formatted;
  };

  const handleChangeText = (text: string) => {
    const formatted = formatDate(text);
    onChangeText?.(formatted);
  };

  const labelStyle = {
    position: 'absolute' as const,
    left: 16,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000000', '#6B7280'],
    }),
  };

  return (
    <View className="mb-4">
      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View className="relative">
          <RNTextInput
            ref={inputRef}
            className={`w-full py-5 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-base ${className || ''}`}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            maxLength={10}
            placeholder=""
            {...props}
          />
          <Animated.Text style={labelStyle}>
            {label}
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
