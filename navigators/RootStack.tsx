import React, {FunctionComponent} from 'react';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import Welcome from './../screens/Welcome';
import Home from './../screens/Home';

// custom components
import {colors} from '../components/colors';
import Greeting from '../components/Header/Greeting';
import Profile from '../components/Header/Profile';
import Avi from './../assets/avi/avatar.png';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
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
      initialRouteName="Home"
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
    </Stack.Navigator>
  </NavigationContainer>
};

export default RootStack;