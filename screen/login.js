import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,TouchableOpacity,TextInput,
  Button,Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Card from './Card';
import CardSection from './CardSection';

export default class login extends Component {
	static navigationOptions= ({navigation}) =>({
      title: 'Login',
      headerLeft: null
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_username: '',
      TextInput_password: '',
    };
  }

  displayMessage = () => {
    fetch('http://www.224tech.com/sasPhp/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userName : this.state.TextInput_username,
        userPassword : this.state.TextInput_password,

      })

    }).then((response) => response.json())
          .then((responseJson) => {

            if (responseJson == 'Member') {
              this.props.navigation.navigate("UserProfile");
							Alert.alert("Logged in successfully");
            } else if (responseJson == 'Admin') {
							this.props.navigation.navigate("Admin");
							Alert.alert("Logged in successfully");
            } else {
							Alert.alert("Wrong! Please try again");
            }


          }).catch((error) => {
            console.error(error);
          });

  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.MainContainer}>
        <Card>
          <CardSection>
            <View style={styles.MainContainer}>
    					<KeyboardAvoidingView behavior="padding">
    	          <Text style={styles.TextTag}>
    	              Login
    	          </Text>
    	          <TextInput style={styles.InputFlied}
    	            placeholder="Enter Username"
                  keyboardType='email-address'
                  returnKeyType='next'
                  onSubmitEditing={()=> this.refs.txtpass.focus()}
    	            onChangeText={TextInputValue =>
    	              this.setState({ TextInput_username: TextInputValue })}
    	          />
    	          <TextInput secureTextEntry={true} style={styles.InputFlied}
                  placeholder="Enter Password"
                  returnKeyType='done'
                  secureTextEntry
                  ref={"txtpass"}
    	            onChangeText={TextInputValue =>
    	              this.setState({ TextInput_password: TextInputValue })}
    	          />
    	          <TouchableOpacity style={styles.Buttons}
                onPress={this.displayMessage} >
                <Text style={styles.txtStyles}>Login</Text>
              </TouchableOpacity>
              <View style={styles.newUser}>
    	          <TouchableOpacity
    	            onPress={()=> navigate('SignUP')}>
    	            <Text style={styles.textStyle}>New user? SIGN UP here.</Text>
    	          </TouchableOpacity>
              </View>
    					</KeyboardAvoidingView>
            </View>
          </CardSection>
      </Card>
    </View>

    );
  }
  }


const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    justifyContent: 'center',
    marginTop:30,
    marginLeft:30,
    marginRight:30,
    marginBottom:50
  },
  TextTag:{
    fontSize: 27,
    margin: 20,
    textAlign:'center'
  },
  InputFlied: {
    margin: 10,
    padding: 10
  },
  Buttons: {
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
  signUpbutton:{
		padding:10,margin:10,width:'95%'
	},
  textStyle: {
    fontSize: 18,
    color:'#007cc2'
  },
  newUser:{
    marginTop:10
  },
  txtStyles: {
    fontSize:20,
    color: '#ffffff',
    textAlign: 'center'
  },
});


AppRegistry.registerComponent('login', () => login);
