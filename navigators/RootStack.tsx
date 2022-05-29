import React, {FunctionComponent} from 'react';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import Welcome from './../screens/Welcome';
import Home from './../screens/Home';
import Balance from './../screens/Balance';

// for balance screen
import {CardProps} from '../components/Cards/types';

// balance back icon
import {Ionicons} from '@expo/vector-icons';

// custom components
import {colors} from '../components/colors';
import Greeting from '../components/Header/Greeting';
import Profile from '../components/Header/Profile';
import Avi from './../assets/avi/avatar.png';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Balance: CardProps;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  return <NavigationContainer>
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
      initialRouteName="Balance"
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen 
        name="Balance"
        component={Balance}
        options={({route}) => ({
          headerTitle: route?.params?.alias,
          headerTitleAlign: "center",
          headerBackImage: (props) => (
            <Ionicons
              {...props}
              name="chevron-back"
              size={25}
              color={colors.secondary}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 0,
          },
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
};

export default RootStack;