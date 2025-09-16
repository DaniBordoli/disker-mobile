import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/auth';
import { 
  AuthScreen, 
  LoginScreen,
  EmailScreen, 
  NameScreen, 
  PasswordScreen, 
  AboutScreen, 
  SocialMediaScreen, 
  AccountCreatedScreen, 
  HomeScreen, 
  CampaignDetailScreen, 
  ProfileScreen, 
  AddPaymentMethodScreen,
  ScriptHistoryScreen,
  RejectedProposalScreen,
  PendingProposalScreen,
  ApprovedProposalScreen,
  AddScriptScreen,
  ProposalDetailsScreen
} from '../screens';
import { AudienceStatsScreen } from '../screens/AudienceStatsScreen';
import { CampaignIdeaScreen } from '../screens/CampaignIdeaScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import SocialMediaProfileScreen from '../screens/SocialMediaProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MessageDetailScreen from '../screens/MessageDetailScreen';
import PaypalScreen from '../screens/PaypalScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import MyCampaignsScreen from '../screens/MyCampaignsScreen';
import { InstagramProgressScreen } from '../screens/InstagramProgressScreen';
import { TikTokProgressScreen } from '../screens/TikTokProgressScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const navigation = useNavigation<any>();
  const accessToken = useAuthStore((s) => s.accessToken);

  React.useEffect(() => {
    if (!accessToken) {
      try {
        navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
      } catch {}
    }
  }, [accessToken, navigation]);

  return (
    <Stack.Navigator 
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
      <Stack.Screen name="CampaignIdeaScreen" component={CampaignIdeaScreen} />
      <Stack.Screen name="AudienceStats" component={AudienceStatsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="SocialMediaProfile" component={SocialMediaProfileScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
      <Stack.Screen name="Paypal" component={PaypalScreen} />
  <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
  <Stack.Screen name="MyCampaigns" component={MyCampaignsScreen} />
  <Stack.Screen name="InstagramProgress" component={InstagramProgressScreen} />
  <Stack.Screen name="TikTokProgress" component={TikTokProgressScreen} />
  <Stack.Screen name="ScriptHistory" component={ScriptHistoryScreen} />
  <Stack.Screen name="RejectedProposal" component={RejectedProposalScreen} />
  <Stack.Screen name="PendingProposal" component={PendingProposalScreen} />
  <Stack.Screen name="ApprovedProposal" component={ApprovedProposalScreen} />
  <Stack.Screen name="AddScript" component={AddScriptScreen} />
  <Stack.Screen name="ProposalDetails" component={ProposalDetailsScreen} />
  <Stack.Screen name="EditName" component={require('../screens/EditNameScreen').default} />
  <Stack.Screen name="EditEmail" component={require('../screens/EditEmailScreen').default} />
  <Stack.Screen name="EditPassword" component={require('../screens/EditPasswordScreen').default} />
  <Stack.Screen name="EditPersonalData" component={require('../screens/EditPersonalDataScreen').default} />
  <Stack.Screen name="EditPhone" component={require('../screens/EditPhoneScreen').default} />
    </Stack.Navigator>
  );
};
