import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function FinalMessage({ navigation }) {

  return (
    <View>
      <Text>Gracias por utilizar nuestros servicios</Text>
      <Button
        title="Sede 1"
        onPress={() => navigation.navigate('aquiVaLaRutaDeStackScreenName')}
      />
    </View>

  );

}