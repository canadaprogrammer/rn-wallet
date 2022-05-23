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
