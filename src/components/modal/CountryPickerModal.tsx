import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SearchInput } from '../inputs/SearchInput';
import { HeadingS } from '../typography/Headings';
import { BodyM, BodyS } from '../typography/BodyText';

interface Country {
  name: string;
  emoji: string;
}

interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: string) => void;
  selectedCountry?: string;
}

const COUNTRIES: Country[] = [
  { name: 'Albania', emoji: '🇦🇱' },
  { name: 'Argelia', emoji: '🇩🇿' },
  { name: 'Andorra', emoji: '🇦🇩' },
  { name: 'Angola', emoji: '🇦🇴' },
  { name: 'Anguila', emoji: '🇦🇮' },
  { name: 'Antártida', emoji: '🇦🇶' },
  { name: 'Antigua y Barbuda', emoji: '🇦🇬' },
  { name: 'Arabia Saudita', emoji: '🇸🇦' },
  { name: 'Argentina', emoji: '🇦🇷' },
  { name: 'Armenia', emoji: '🇦🇲' },
  { name: 'Aruba', emoji: '🇦🇼' },
  { name: 'Australia', emoji: '🇦🇺' },
  { name: 'Austria', emoji: '🇦🇹' },
  { name: 'Brasil', emoji: '🇧🇷' },
  { name: 'Chile', emoji: '🇨🇱' },
  { name: 'Colombia', emoji: '🇨🇴' },
  { name: 'Ecuador', emoji: '🇪🇨' },
  { name: 'España', emoji: '🇪🇸' },
  { name: 'Estados Unidos', emoji: '🇺🇸' },
  { name: 'Francia', emoji: '🇫🇷' },
  { name: 'Italia', emoji: '🇮🇹' },
  { name: 'México', emoji: '🇲🇽' },
  { name: 'Paraguay', emoji: '🇵🇾' },
  { name: 'Perú', emoji: '🇵🇪' },
  { name: 'Uruguay', emoji: '🇺🇾' },
  { name: 'Venezuela', emoji: '🇻🇪' },
];

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCountry
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectCountry = (country: Country) => {
    onSelect(`${country.emoji} ${country.name}`);
    onClose();
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <View>
      <TouchableOpacity
        className="flex-row items-center py-4"
        onPress={() => handleSelectCountry(item)}
      >
        <Text className="text-xl mr-3">{item.emoji}</Text>
        <Text className="text-base text-black flex-1">{item.name}</Text>
        {selectedCountry === item.name && (
          <Image
            source={require('../../public/Icons/IconCheck.png')}
            className="w-5 h-5"
            style={{ tintColor: '#22C55E' }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      <View className="mx-2 h-px bg-gray-300" />
    </View>
  );

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
          <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '98%', maxHeight: '100%' }}>
       
            <View className="flex-row justify-between items-center mb-2">
              <HeadingS className="text-xl font-bold text-black">
                Seleccioná tu país
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

       
            <BodyM className="text-gray-500 text-base mb-6">
              Necesitamos esta info para mostrarte campañas disponibles en tu región.
            </BodyM>

            <View className="mb-6">
              <SearchInput
                placeholder="Buscar país"
                value={searchText}
                onChangeText={setSearchText}
                className="bg-gray-100"
              />
            </View>

         
            <View className="flex-1">
              <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
