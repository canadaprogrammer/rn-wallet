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
