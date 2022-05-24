# Wallet App

## Create a new app

- ```bash
  expo init rn-wallet
  > blank (TypeScript)
  cd rn-wallet
  ```

- test, `expo start`

  - return error

## Troubleshooting the Error

- Error:

  - Failed building JavaScript bundle.
    App.tsx: [BABEL] D:\study_program\rn-wallet\App.tsx: You gave us a visitor for the node type TSInstantiationExpression but it's not a valid type

- `expo start` returned warning

  - WARNING: expo-cli has not yet been tested against Node.js v16.13.2.
    If you encounter any issues, please report them to https://github.com/expo/expo-cli/issues

- Checked expo version, `expo --version`

  - returned 4.4.3

- Reinstall expo-cli to the latest version

  - `npm install -g expo-cli`

  - `expo --version` returned 5.4.6

## Landing Page

- ```
  mkdir screens
  mkdir components
  yarn add styled-components
  yarn add @types/styled-components @types/styled-components-react-native
  ```

### Create Shared Styles

- Create `/components/colors.tsx`

  - ```tsx
    export const colors = {
      white: '#fff',
      primary: '#ef835d',
      secondary: '#2c365a',
      tertiary: '#85c6d8',
      gray: '#d1d5db',
      graylight: 'f3f4f6',
      graydark: '#4b5563',
      accent: '#fbcd77',
    };
    ```

- Create `/components/shared.tsx`

  - ```tsx
    import { Dimensions } from 'react-native';
    import styled from 'styled-components/native';
    import { colors } from './colors';

    export const Container = styled.View`
      flex: 1;
      align-items: center;
      background-color: ${colors.white};
    `;

    export const ScreenWidth = Dimensions.get('screen').width;
    export const ScreenHeight = Dimensions.get('screen').height;
    ```

### Add Image To The Top

- On `/App.tsx`

  - ```tsx
    import React from 'react';
    import Welcome from './screens/Welcome';

    export default function App() {
      return <Welcome />;
    }
    ```

- Download a background image

  - `/assets/bgs/cool-background.png`

- Create `/screens/Welcome.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import { StatusBar } from 'expo-status-bar';
    import styled from 'styled-components/native';

    // custom components
    import { colors } from '../components/colors';
    import { Container } from '../components/shared';

    const WelcomeContainer = styled(Container)`
      background-color: ${colors.secondary};
      justify-content: space-between;
      width: 100%;
      height: 100%;
    `;

    const TopSection = styled.View`
      width: 100%;
      flex: 1;
      max-height: 55%;
    `;

    const TopImage = styled.Image`
      width: 100%;
      height: 100%;
      resize-mode: stretch;
    `;

    const BottomSection = styled.View`
      width: 100%;
      padding: 25px;
      flex: 1;
    `;

    // image
    import background from '../assets/bgs/cool-background.png';

    const Welcome: FunctionComponent = () => {
      return (
        <>
          <StatusBar style='light' />
          <WelcomeContainer>
            <TopSection>
              <TopImage source={background} />
            </TopSection>
            <BottomSection></BottomSection>
          </WelcomeContainer>
        </>
      );
    };

    export default Welcome;
    ```

### Add Google Fonts

#### Method 1: Use Google Fonts by Downloading

- Download Google fonts

  - `/assets/fonts/Lato-Bold.ttf` and `/assets/fonts/Lato-Regular.ttf`

- To use the custom fonts, `expo install expo-font expo-splash-screen`

- On `App.tsx`

  - ```tsx
    import React, {useEffect, useState} from 'react';
    import * as SplashScreen from 'expo-splash-screen';
    import Welcome from './screens/Welcome';
    // custom font
    import {useFonts} from 'expo-font';
    ...
    export default function App() {
      const [appIsReady, setAppIsReady] = useState(false);

      const [fontLoaded] = useFonts({
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
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
    ```

#### Method 2: Use `@expo-google-fonts` package

- `expo install @expo-google-fonts/lato expo-font expo-splash-screen`

- On `App.tsx`

  - ```tsx
    ...
    // custom font
    import {
      useFonts,
      Lato_400Regular,
      Lato_700Bold,
    } from '@expo-google-fonts/lato';

    export default function App() {
      const [appIsReady, setAppIsReady] = useState(false);

      const [fontLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold,
      })

      ...
    ```

### Styling Text

- Create `/components/Texts/SmallText.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';

    // colors
    import { colors } from '../colors';
    const StyledTest = styled.Text`
      font-size: 13px;
      color: ${colors.gray};
      text-align: left;
      font-family: Lato-Regular;
      // font-family: 'Lato_400Regular'; for using `@expo-google-fonts/lato`
    `;

    const SmallText: FunctionComponent = () => {
      return <></>;
    };

    export default SmallText;
    ```

- Create `/components/Texts/types.tsx`

  - ```tsx
    import { ReactNode } from 'react';
    import { StyleProp, TextStyle } from 'react-native';

    export interface TextProps {
      textStyles?: StyleProp<TextStyle>;
      children: ReactNode;
    }
    ```

- On `/components/Text/SmallText.tsx`

  - ```tsx
    ...
    // types
    import { TextProps } from './types';

    const SmallText: FunctionComponent<TextProps> = (props) => {
      return <StyledText style={props.textStyles}>{props.children}</StyledText>;
    }

    export default SmallText;
    ```

  - Error: `react.ReactNode' is not assignable to type 'import(...).ReactNode'`

    - Added below code to `/package.json`

      - ```json
        "resolutions": {
          "@types/react": "17.0.40"
        }
        ```

    - And then Reload Window

- Create `/components/Text/RegularText.tsx` and `/components/Text/BigText.tsx` as similar as `SmallText.tsx`

  - On `BigText.tsx`

    - ```tsx
      ...

      const StyledText = styled.Text`
        font-size: 37px;
        color: ${colors.white};
        ...
        font-family: Lato-Bold;
      `;

      ...

      const BigText: FunctionComponent<TextProps> = (props) => {
        ...
      }

      export default BigText;
      ```

  - On `RegularText.tsx`

    - ```tsx
      ...

      const StyledText = styled.Text`
        font-size: 15px;
        color: ${colors.white};
        ...
        font-family: Lato-Bold;
      `;

      ...

      const RegularText: FunctionComponent<TextProps> = (props) => {
        ...
      }

      export default RegularText;
      ```

- On `/screens/Welcome.tsx`

  - ```tsx
    ...
    import BigText from '../components/Texts/BigText';
    import SmallText from '../components/Texts/SmallText';

    ...
        <BottomSection>
          <BigText textStyles={{ width: "70%", marginBottom: 25}}>
            Best way to track your money
          </BigText>
          <SmallText textStyles={{ width: "70%", marginBottom: 25}}>
            Best payment method, connect your money to your friends, family.
          </SmallText>
        </BottomSection>
    ...
    ```

### Add Button

- Create `/components/Buttons/RegularButton.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';
    import {
      GestureResponderEvent,
      StyleProp,
      TextStyle,
      ViewStyle,
    } from 'react-native';

    // components
    import { colors } from '../colors';
    import RegularText from './../Texts/RegularText';

    const ButtonView = styled.TouchableOpacity`
      align-items: center;
      background-color: ${colors.primary};
      width: 100%;
      padding: 20px;
      border-radius: 20px;
    `;

    // types
    interface ButtonProps {
      btnStyles?: StyleProp<ViewStyle>;
      onPress: ((event: GestureResponderEvent) => void) | undefined;
      textStyles?: StyleProp<TextStyle>;
      children: React.ReactNode;
    }

    const RegularButton: FunctionComponent<ButtonProps> = (props) => {
      return (
        <ButtonView onPress={props.onPress} style={props.btnStyles}>
          <RegularText textStyles={props.textStyles}>
            {props.children}
          </RegularText>
        </ButtonView>
      );
    };

    export default RegularButton;
    ```

- On `/screens/Welcome.tsx`

  - ```tsx
    ...
    import RegularButton from '../components/Buttons/RegularButton';

    const BottomSection = styled.View`
      ...
      justify-content: flex-end;
    `;
    ...
          <RegularButton onPress={() => {}}>
            Get Started
          </RegularButton>
        </BottomSection>
        ...
    ```

## Initial React Navigation Setup with Typescript

- Install React Navigation and Stack Navigator

  - ```bash
    yarn add @react-navigation/native
    expo install react-native-screens react-native-safe-area-context
    yarn add @react-navigation/stack
    expo install react-native-gesture-handler
    ```

- create `/navigators/RootStack.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';

    // React Navigation
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';

    // screens
    import Welcome from './../screens/Welcome';

    export type RootStackParamList = {
      Welcome: undefined;
    };

    const Stack = createStackNavigator<RootStackParamList>();

    const RootStack: FunctionComponent = () => {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    export default RootStack;
    ```

- On App.tsx

  - ```tsx
    ...
    // import Welcome from './screens/Welcome';

    // React Navigation
    import RootStack from './navigators/RootStack';

    ...
      return (
        // <Welcome />
        <RootStack />
      );
    };
    ```
