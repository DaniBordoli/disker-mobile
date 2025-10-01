/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import './global.css';
import { BASE_URL } from './src/config';
import { useAuthStore } from './src/store/auth';
import { getCurrentUser } from './src/services/api';

function App(): React.JSX.Element {
  // Log base API URL on app start
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[ENV] BASE_URL =', BASE_URL);
  }, []);

  // Hydrate auth store on boot
  useEffect(() => {
    try {
      useAuthStore.getState().hydrate();
    } catch {}
  }, []);

  // After hydration: if we have a token and no recent user fetch, get current user once
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const lastFetchedUserAt = useAuthStore((s) => s.lastFetchedUserAt);

  useEffect(() => {
    if (!isHydrated) return;
    if (accessToken && !lastFetchedUserAt) {
      (async () => {
        try {
          await getCurrentUser();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('[Boot] getCurrentUser failed', e);
        }
      })();
    }
  }, [isHydrated, accessToken, lastFetchedUserAt]);
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
