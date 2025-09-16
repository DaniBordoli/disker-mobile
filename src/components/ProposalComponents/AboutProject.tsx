import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Modal, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { HeadingS } from '../typography/Headings';
import { BodyM } from '../typography/BodyText';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { CampaignData } from '../../types/campaign';

interface AboutProjectProps {
  data: CampaignData;
}

export const AboutProject: React.FC<AboutProjectProps> = ({ data }) => {
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
    <>
      {/* About project */}
      <HeadingS className="text-primary-950 mb-3">Acerca del proyecto</HeadingS>
      <BodyM className="text-primary-950 leading-6 mb-4">
        {data.aboutProject.summary}
      </BodyM>
      
      <View className="items-center">
        <PrimaryButton 
          title="Mostrar más" 
          variant="outline"
          onPress={() => setShowProjectModal(true)}
        />
      </View>

      {/* Divider */}
      <View className="h-px bg-primary-200 mt-6" />

      {/* Project details modal */}
      <Modal
        visible={showProjectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProjectModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '85%', maxHeight: '95%' }}>
              {/* Modal header */}
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950">
                  Acerca del proyecto
                </HeadingS>
                <TouchableOpacity onPress={() => setShowProjectModal(false)} className="p-1">
                  <Image
                    source={require('../../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Full description */}
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {data.aboutProject.fullDescription.split('\n\n').map((paragraph, index) => (
                  <BodyM key={index} className="text-primary-950 mb-4">
                    {paragraph}
                  </BodyM>
                ))}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};