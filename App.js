import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity,YellowBox } from 'react-native';
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
import HomePage from "./screen/homePage";
import QuestionCList from "./screen/questionCList";
import AnsweringQuestion from "./screen/answeringQuestion";
import RatingQuestion from "./screen/ratingQuestion";
import OnlineQuestion from "./screen/onlineQuestion";
import ServeyQuestion from "./screen/serveyQuestion";
import ServeyResult from "./screen/serveyResult";
import ServeyRating from "./screen/serveyRating"


const AuthStack = StackNavigator({
  Login: {screen: Login},
  SignUP: {screen: SignUP},
  HomePage: {screen: HomePage},
  Admin: {screen: Admin},
  AddSection: {screen: AddSection},
  EditSection: {screen: EditSection},
  Question: {screen: Question},
  AddQuestion: {screen: AddQuestion},
  QrOrQuestion: {screen: QrOrQuestion},
  QrGenerator: {screen: QrGenerator},
  QuestionCList: {screen: QuestionCList},
  AnsweringQuestion: {screen: AnsweringQuestion},
  RatingQuestion: {screen: RatingQuestion},
  OnlineQuestion: {screen: OnlineQuestion},
  ServeyQuestion: {screen: ServeyQuestion},
  ServeyResult: {screen: ServeyResult},
  ServeyRating: {screen: ServeyRating},
});


export default SwitchNavigator({
  Splash: {screen: Splash},
  Auth: AuthStack,
  //AddQuestion: {screen: AddQuestion},  
});

