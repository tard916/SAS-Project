import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';

import QrGenerator from "./qrGenerator";
import Question from "./questions";

export default class qrOrQuestion extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
        txtQr_ID : '',
    }
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handlePress1 = this.handlePress1.bind(this);
  }
  
  componentWillMount() {
    console.log(this.props.navigation)
    this.setState({
         txtQr_ID: this.props.navigation.state.params.qr_ID,
    })
    
    this.animatedValue = new Animated.Value(1);
  }
  
  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .5
    }).start()
  }
  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start()
  }
  handlePress() {
    
    this.props.navigation.navigate('QrGenerator', {
        ID : this.state.txtQr_ID,  
        
    });
  }
  handlePress1() {
    
    this.props.navigation.navigate('Question', {
        ID : this.state.txtQr_ID,  
        
    });
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPressIn={this.handlePressIn}
            onPressOut={this.handlePressOut}
            onPress={this.handlePress}
          >
            <Animated.View style={[styles.button1, animatedStyle]}>
              <Text style={styles.text}>Generate an QR Code</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={this.handlePress1}
        >
          <Animated.View style={[styles.button2, animatedStyle]}>
            <Text style={styles.text}>Add Question</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {    
    alignItems: 'center',
  },
  button1: {
    alignSelf: 'stretch',
    backgroundColor: '#007cc2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginTop:10,
    marginLeft: 5,
    marginRight: 5,
    padding:10,
    elevation: 2,
  },
  button2: {
    alignSelf: 'stretch',
    backgroundColor: '#007cc2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginTop:10,
    marginLeft: 5,
    marginRight: 5,
    padding:10,
    elevation: 2,
  },
  text: {
    color: "#FFF"
  }
});

AppRegistry.registerComponent('qrOrQuestion', () => qrOrQuestion);