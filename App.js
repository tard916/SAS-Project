import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import Splash from './screen/Splash';
import Login from './screen/login';
import SignUP from './screen/signUP';
import Admin from "./screen/admin";
import AddSection from "./screen/addSection";
import EditSection from "./screen/editSection";
import QrOrQuestion from "./screen/qrOrQuestion";
import QrGenerator from "./screen/qrGenerator";
import Question from "./screen/questions";
import AddQuestion from "./screen/addQuestion";


const AuthStack = StackNavigator({
  Login: {screen: Login},
  SignUP: {screen: SignUP},
  Admin: {screen: Admin},
  AddSection: {screen: AddSection},
  EditSection: {screen: EditSection},
  Question: {screen: Question},
  AddQuestion: {screen: AddQuestion},
  QrOrQuestion: {screen: QrOrQuestion},
  QrGenerator: {screen: QrGenerator},
});


export default SwitchNavigator({
  Splash: {screen: Splash},
  Auth: AuthStack,
  //AddQuestion: {screen: AddQuestion},  
});

