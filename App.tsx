/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import SignUp from './Screens/Signup';
import SendLocation from './Screens/SendLocation';
import RetriveLocation from './Screens/RetriveLocation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="onBoarding">

          {/*  Login Screen */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{

              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{

              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SendLocation"
            component={SendLocation}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RetriveLocation"
            component={RetriveLocation}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );

};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
