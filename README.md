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

## Home Screen

- Create `/screens/Home.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import { StatusBar } from 'expo-status-bar';
    import styled from 'styled-components/native';

    // custom components
    import { colors } from '../components/colors';
    import { Container } from '../components/shared';

    const HomeContainer = styled(Container)`
      background-color: ${colors.graylight};
      width: 100%;
      flex: 1;
    `;

    const Home: FunctionComponent = () => {
      return (
        <HomeContainer>
          <StatusBar style='dark' />
        </HomeContainer>
      );
    };

    export default Home;
    ```

- On `/navigators/RootStack.tsx`

  - ```tsx
    ...
    import Home from './../screens/Home';

    // custom components
    import {colors} from '../components/colors';

    export type RootStackParamList = {
      ...
      Home: undefined;
    };

    ...
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.graylight,
              borderBottomWidth: 0,
              shadowColor: "transparent",
              shadowOpacity: 0,
              elevation: 0,
              height: 120,
            },
            headerTintColor: colors.secondary,
          }}
          initialRouteName="Home"
        >
          ...
          <Stack.Screen name="Home" component={Home} />
        ...
    ```

### Add Greeting Header

- Create `/components/Header/Greeting.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';
    import { StyleProp, TextStyle } from 'react-native';

    // custom components
    import { colors } from '../colors';
    import RegularText from '../Texts/RegularText';
    import SmallText from '../Texts/SmallText';

    const StyledView = styled.View`
      flex-direction: column;
      flex: 1;
      justify-content: center;
    `;

    interface GreetingProps {
      mainText: string;
      subText: string;
      mainTextStyles?: StyleProp<TextStyle>;
      subTextStyles?: StyleProp<TextStyle>;
    }
    const Greeting: FunctionComponent<GreetingProps> = (props) => {
      return (
        <StyledView>
          <RegularText
            textStyles={[
              {
                color: colors.secondary,
                fontSize: 22,
              },
              props.mainTextStyles,
            ]}
          >
            {props.mainText}
          </RegularText>
          <SmallText
            textStyles={[
              {
                color: colors.graydark,
              },
              props.subTextStyles,
            ]}
          >
            {props.subText}
          </SmallText>
        </StyledView>
      );
    };

    export default Greeting;
    ```

- On `/navigators/RootStack.tsx`

  - ```tsx
    ...
    import Greeting from '../components/Header/Greeting';

    ...
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: (props) => (
            <Greeting
              mainText="Hey!"
              subText="Welcome Back"
              {...props}
            />
          ),
        }}
      />
      ...
    ```

### Add Profile Header

- Create `/components/Header/Profile.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';
    import {
      ImageSourcePropType,
      GestureResponderEvent,
      StyleProp,
      ViewStyle,
      ImageStyle,
    } from 'react-native';

    const StyledView = styled.TouchableOpacity`
      flex-direction: column,
      height: 45px,
      width: 45px;
      border-radius: 15px;
    `;

    const StyledImage = styled.Image`
      resize-mode: cover;
      width: 100%;
      height: 100%;
      border-radius: 15px;
    `;

    interface ProfileProps {
      img: ImageSourcePropType;
      imgStyle?: StyleProp<ImageStyle>;
      imgContainerStyle?: StyleProp<ViewStyle>;
      onPress?: ((event: GestureResponderEvent) => void) | undefined;
    }

    const Profile: FunctionComponent<ProfileProps> = (props) => {
      return (
        <StyledView onPress={props.onPress} style={props.imgContainerStyle}>
          <StyledImage style={props.imgStyle} source={props.img} />
        </StyledView>
      );
    };

    export default Profile;
    ```

- On `/navigators/RootStack.tsx`

  - ```tsx
    ...
    import Profile from '../components/Header/Profile';
    import Avi from './../assets/avi/avatar.png';

    ...
        <Stack.Navigator
          screenOptions={{
            ...
            headerRightContainerStyle: {
              paddingRight: 25,
            },
            headerLeftContainerStyle: {
              paddingLeft: 25,
            },
            headerRight: () => (
              <Profile
                img={Avi}
                imgContainerStyle={{backgroundColor: colors.tertiary}}
              />
            ),
          }}
          initialRouteName="Home"
        >
          ...
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: (props) => (
                <Greeting
                  mainText="Hey!"
                  subText="Welcome Back"
                  {...props}
                />
              ),
              headerTitle: () => <></>
            }}
          />
        ...
    ```

## Cards Section | Horizontal Scrollable List (FlatList)

- Create `/components/Cards/CardSection.tsx`

  - ```tsx
    import React, {FunctionComponent} from 'react';
    import styled from 'styled-components/native';

    // components
    const CardList = styled.FlatList`
      width: 100%;
      flex: 1;
      padding-left: 25px;
      padding-bottom: 15px;
    `;

    const CardSection: FunctionComponent = () => {
      return (

      );
    };

    export default CardSection;
    ```

- Create `/components/Cards/types.tsx`

  - ```tsx
    import { ImageSourcePropType } from 'react-native';

    export interface CardProps {
      id: number;
      accountNo: string;
      balance: number;
      alias?: string;
      logo: ImageSourcePropType;
    }

    export interface CardSectionProps {
      data: Array<CardProps>;
    }
    ```

- On `/components/Cards/CardSection.tsx`

  - ```tsx
    ...

    // types
    import {CardSectionProps} from './types';

    const CardSection: FunctionComponent<CardSectionProps> = (props) => {
      return (
        <CardList
          data={props.data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: 25,
            alignItems: "center",
          }}
          keyExtractor={({id}: any) => id.toString()}
          renderItem={}
        />
      );
    ...
    ```

- Create `/components/Cards/CardItem.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';

    // components
    import { ScreenWidth } from '../shared';
    import { colors } from '../colors';

    const CardBackground = styled.ImageBackground`
      height: 75%;
      width: ${ScreenWidth * 0.67}px;
      resize-mode: cover;
      background-color: ${colors.accent};
      border-radius: 25px;
      margin-right: 25px;
      overflow: hidden;
    `;

    const CardTouchable = styled.TouchableHighlight`
      height: 100%;
      border-radius: 25px;
    `;

    const TouchableView = styled.View`
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      flex: 1;
    `;

    const CardRow = styled.View`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    `;

    const Logo = styled.Image`
      width: 100%;
      height: 80%;
      resize-mode: contain;
      flex: 1;
    `;

    // images
    import card_bg from '../../assets/bgs/background_transparent.png';

    // types
    import { CardProps } from './types';

    const CardItem: FunctionComponent<CardProps> = (props) => {
      const handlePress = () => {};
      return (
        <CardBackground source={card_bg}>
          <CardTouchable underlayColor={colors.secondary} onPress={handlePress}>
            <TouchableView>
              <CardRow></CardRow>
              <CardRow></CardRow>
            </TouchableView>
          </CardTouchable>
        </CardBackground>
      );
    };

    export default CardItem;
    ```

- On `/components/Cards/CardSection.tsx`

  - ```tsx
    ...
    // components
    import CardItem from './CardItem';
    ...

    const CardSection: FunctionComponent<CardSectionProps> = (props) => {
      return (
        <CardList
          ...
          renderItem={({item}: any) => <CardItem {...item}/>}
          ...
    ```

- On `/screens/Home.tsx`

  - ```tsx
    ...
    import CardSection from '../components/Cards/CardSection';

    ...
    // images
    import master_card from '../assets/cards/master_card.png';
    import visa from '../assets/cards/visa.png';

    const Home: FunctionComponent = () => {
      const cardsData = [
        {
          id: 1,
          accountNo: "111111111",
          balance: 20000.50,
          alias: "Work Debit",
          logo: master_card,
        },
        {
          id: 2,
          accountNo: "111111112",
          balance: 10000.20,
          alias: "Personal Prepaid",
          logo: visa,
        },
        {
          id: 3,
          accountNo: "111111113",
          balance: 4000.00,
          alias: "School Prepaid",
          logo: visa,
        }
      ]
      return (
        <HomeContainer>
          <StatusBar style="dark"/>
          <CardSection data={cardsData} />
        </HomeContainer>
        ...
    ```

- On `/components/Cards/CardItem.tsx`

  - ```tsx
    import {View} from 'react-native';
    ...
    import RegularText from '../Texts/RegularText';
    import SmallText from '../Texts/SmallText';
    ...

          <CardRow>
            <RegularText textStyles={{color: colors.black}}>
              ****** {props.accountNo.slice(6,10)}
            </RegularText>
          </CardRow>
          <CardRow>
            <View style={{flex:3}}>
              <SmallText
                textStyles={{marginBottom: 1, color: colors.graydark}}
              >
                Total Balance
              </SmallText>
              <RegularText
                textStyles={{fontSize: 19, color: colors.graydark}}
              >
                ${props.balance.toFixed(2)}
              </RegularText>
            </View>
            <Logo source={props.logo} />
          </CardRow>
          ...
    ```

## Transaction Section | Vertical FlatList

- Create `/components/Transactions/types.tsx`

  - ```tsx
    export interface TransactionProps {
      id: number;
      title: string;
      subtitle: string;
      amount: string;
      date: string;
      art: {
        icon: string;
        background: string;
      };
    }

    export interface TransactionSectionProps {
      data: Array<TransactionProps>;
    }

    export interface TransactionAviProps {
      icon: any;
      background: string;
    }
    ```

- Create `/components/Transactions/TransactionSection.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';
    import { Ionicons } from '@expo/vector-icons';
    // colors
    import { colors } from '../colors';
    import RegularText from '../Texts/RegularText';
    import SmallText from '../Texts/SmallText';

    const TransactionSectionBackground = styled.View`
      width: 100%;
      padding-horizontal: 25px;
      padding-top: 5px;
      flex: 2;
    `;

    const TransactionRow = styled.View`
      flex-direction: row;
      justify-content: space-between;
      align-item: center;
      width: 100%;
    `;

    const TransactionList = styled.FlatList`
      width: 100%;
    `;

    // types
    import { TransactionSectionProps } from './types';

    const TransactionSection: FunctionComponent<TransactionSectionProps> = (
      props
    ) => {
      return (
        <TransactionSectionBackground>
          <TransactionRow style={{ marginBottom: 25 }}>
            <RegularText textStyles={{ fontSize: 19, color: colors.secondary }}>
              Transaction
            </RegularText>
            <SmallText textStyles={{ color: colors.secondary }}>
              Recent
              <Ionicons name='caret-down' size={13} color={colors.graydark} />
            </SmallText>
          </TransactionRow>
          <TransactionList
            data={props.data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 25,
            }}
            keyExtractor={({ id }: any) => id.toString()}
            // renderItem={}
          />
        </TransactionSectionBackground>
      );
    };

    export default TransactionSection;
    ```

- On `/screens/Home.tsx`

  - ```tsx
    ...
    import TransactionSection from '../components/Transactions/TransactionSection';

    ...
    return (
      <HomeContainer>
        <StatusBar style="dark"/>
        <CardSection data={cardsData} />
        <TransactionSection data={transactionData}/>
      </HomeContainer>
    );
    ...
    ```

- Create `/components/Transactions/TransactionItem.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';

    // colors
    import { colors } from '../colors';
    import RegularText from '../Texts/RegularText';
    import SmallText from '../Texts/SmallText';

    const TransactionRow = styled.View`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 25px;
    `;

    const LeftView = styled.View`
      flex-direction: row;
      justify-content: flex-start;
      height: 100%;
      align-items: center;
      flex: 2;
    `;

    const RightView = styled.View`
      flex: 1;
    `;

    // types
    import { TransactionProps } from './types';

    const TransactionItem: FunctionComponent<TransactionProps> = (props) => {
      return (
        <TransactionRow>
          <LeftView></LeftView>
          <RightView></RightView>
        </TransactionRow>
      );
    };

    export default TransactionItem;
    ```

- Create `/components/Transactions/TransactionAvi.tsx`

  - ```tsx
    import React, { FunctionComponent } from 'react';
    import styled from 'styled-components/native';

    // icons
    import { Ionicons } from '@expo/vector-icons';

    // custom components
    import { colors } from '../colors';

    const StyledView = styled.View`
      height: 45px;
      width: 45px;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
    `;

    // typs
    import { TransactionAviProps } from './types';

    const TransactionAvi: FunctionComponent<TransactionAviProps> = (props) => {
      return (
        <StyledView style={{ backgroundColor: props.background }}>
          <Ionicons name={props.icon} size={25} color={colors.white} />
        </StyledView>
      );
    };

    export default TransactionAvi;
    ```

- On `/components/Transactions/TransactionItems.tsx`

  - ```tsx
    ...
    import {View} from 'react-native';
    import TransactionAvi from './TransactionAvi';
    ...
      return (
        <TransactionRow>
          <LeftView>
            <TransactionAvi
              background={props.art.background}
              icon={props.art.icon}
            />
            <View style={{marginLeft: 10}}>
              <RegularText
                textStyles={{
                  color: colors.secondary,
                  textAlign: 'left',
                  marginBottom: 5,
                }}
              >
                {props.title}
              </RegularText>
              <SmallText
                textStyles={{
                  color: colors.graydark,
                }}
              >
                {props.subtitle}
              </SmallText>
            </View>
          </LeftView>
          <RightView>
            <RegularText
              textStyles={{
                color: colors.secondary,
                textAlign: 'right',
                marginBottom: 5,
              }}
            >
              {props.amount}
            </RegularText>
            <SmallText
              textStyles={{
                color: colors.graydark,
                textAlign: 'right',
              }}
            >
              {props.date}
            </SmallText>
          </RightView>
        </TransactionRow>
      );
    ```

- On `/components/Transactions/TransactionSection.tsx`

  - ```tsx
    ...
    import TransactionItem from './TransactionItem';
    ...
            renderItem={({item}: any) => <TransactionItem {...item}/>}
            ...
    ```
