import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home  from './components/home.js';
import BranchHome from './components/branchHome.js';
import BranchEmployees from './components/branchEmployees.js'
import BranchServices from './components/branchServices.js'
import BranchMap from './components/branchMap.js'
import BranchContact from './components/branchContact.js'
import BranchServicesEmployees from './components/branch-Services-Employees.js'
import SignUp from './components/newClientForm.js'
import Login from './components/oldClientLogIn.js'
import Appointment from './components/apponitment.js'
import FinalMessage from './components/finalMessage.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"  component={Home} />
        <Stack.Screen name="aquiVaLaRutaDeStackScreenName" component={Home} />
        <Stack.Screen name="Branch" component={BranchHome} />
        <Stack.Screen name="Barbers" component={BranchEmployees} />
        <Stack.Screen name="Services" component={BranchServices} />
        <Stack.Screen name="Map" component={BranchMap} />
        <Stack.Screen name="Contact" component={BranchContact} />
        <Stack.Screen name="Select" component={BranchServicesEmployees} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Confirmed" component={FinalMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
