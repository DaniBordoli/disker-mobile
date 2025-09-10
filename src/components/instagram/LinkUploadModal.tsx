import React from 'react';
import { 
  Modal, 
  KeyboardAvoidingView, 
  Platform, 
  View, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { HeadingS } from '../typography/Headings';
import { BodyM } from '../typography/BodyText';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { FloatingLabelInput } from '../inputs/FloatingLabelInput';

interface LinkUploadModalProps {
  visible: boolean;
  onClose: () => void;
  linkText: string;
  onLinkTextChange: (text: string) => void;
  onSubmit: () => void;
}

export const LinkUploadModal: React.FC<LinkUploadModalProps> = ({
  visible,
  onClose,
  linkText,
  onLinkTextChange,
  onSubmit
}) => {
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
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '43%', maxHeight: '50%' }}>
            <View className="flex-row justify-between items-center mb-6">
              <HeadingS className="text-xl font-bold text-primary-950">
                Subí el link de tu publicación
              </HeadingS>
              <TouchableOpacity onPress={onClose} className="p-1">
                <Image
                  source={require('../../public/Icons/IconClose.png')}
                  className="w-6 h-6"
                  style={{ tintColor: '#000000' }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <BodyM className="text-gray-600 mb-4">
              Pegá acá el enlace del contenido que subiste en redes para que podamos validarlo.
            </BodyM>

            <View className="mb-6">
              <FloatingLabelInput
                label="Link de la publicación"
                value={linkText}
                onChangeText={onLinkTextChange}
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>

            <PrimaryButton
              title="Agregar link"
              variant="dark"
              onPress={onSubmit}
              disabled={!linkText.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
