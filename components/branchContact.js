import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function BranchContact({ navigation }) {

  return (
    <View>
      <Text>Contáctanos</Text>
      <Button
        title="Teléfono"
        onPress={() => navigation.navigate('aquiVaLaRutaDeStackScreenName')}
      />
      <Button
        title="Whatsapp"
        onPress={() => navigation.navigate('aquiVaLaRutaDeStackScreenName')}
      />
    </View>

  );

}