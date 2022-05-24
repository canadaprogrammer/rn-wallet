import React, {useEffect, useState} from 'react';
// custom font
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import Welcome from './screens/Welcome';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch(e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  },[]);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    }
    if(fontLoaded && appIsReady) {
      hideSplashScreen();
    }
  }, [appIsReady]);
  
  if(!appIsReady) {
    return null;
  }

  return (
    <Welcome />
  );
};