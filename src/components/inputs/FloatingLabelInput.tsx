import React, { useState, useRef } from 'react';
import { 
  TextInput as RNTextInput, 
  View, 
  Text, 
  Animated, 
  TextInputProps,
  TouchableWithoutFeedback 
} from 'react-native';

interface FloatingLabelInputProps extends Omit<TextInputProps, 'placeholder'> {
  label: string;
  error?: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ 
  label, 
  error,
  value,
  onFocus,
  onBlur,
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
            className={`w-full py-5 px-4 rounded-xl border ${isFocused ? 'border-primary-950' : 'border-primary-300'} bg-white text-gray-900 text-base ${className || ''}`}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
