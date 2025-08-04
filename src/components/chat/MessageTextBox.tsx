import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';

interface MessageTextBoxProps {
  onSendMessage?: (message: string) => void;
  onAttachFile?: () => void;
  onStartRecording?: () => void;
  placeholder?: string;
}

export const MessageTextBox: React.FC<MessageTextBoxProps> = ({
  onSendMessage,
  onAttachFile,
  onStartRecording,
  placeholder = "Mensaje"
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="bg-white">
      <View 
        className="mx-4 mb-6 mt-2"
        style={{ 
          backgroundColor: '#F9FAFB',
          borderRadius: 25,
          shadowColor: '#191919',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 10
        }}
      >
        <View className="flex-row items-center px-4 py-3">
    
        <TouchableOpacity className="mr-3">
          <Image
            source={require('../../public/MessageIcons/IconEmojiMessage.png')}
            className="w-6 h-6"
            style={{ tintColor: '#0F172A' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-primary-950 text-base"
          multiline={true}
          maxLength={500}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        
        <TouchableOpacity className="mx-3" onPress={onAttachFile}>
          <Image
            source={require('../../public/MessageIcons/IconClipMessage.png')}
            className="w-6 h-6"
            style={{ tintColor: '#0F172A' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

       
        <TouchableOpacity 
          onPress={message.trim() ? handleSend : onStartRecording}
          className="w-8 h-8 items-center justify-center"
        >
          <Image
            source={require('../../public/MessageIcons/IconAudioMessage.png')}
            className="w-6 h-6"
            style={{ tintColor: '#0F172A' }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};
