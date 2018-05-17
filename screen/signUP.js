import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ScrollView, View, Button, Alert, StyleSheet,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

import Card from './Card';
import CardSection from './CardSection';

export default class signUp extends Component {
	static navigationOptions= ({navigation}) =>({
			title: 'Sign Up',
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_fullname: '',
      TextInput_username: '',
      TextInput_email: '',
      TextInput_password: '',
      TextInput_company: '',
      TextInput_Industry:'',
    };
  }

  displayMessage = () => {
    fetch('http://www.224tech.com/sasPhp/signUp.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userFullname : this.state.TextInput_fullname,
        userName : this.state.TextInput_username,
        userEmail : this.state.TextInput_email,
        userPassword : this.state.TextInput_password,
        userCompany : this.state.TextInput_company,
        userIndustry : this.state.TextInput_Industry

      })

    }).then((response) => response.json())
          .then((responseJson) => {				

            if (responseJson == 'Thank you for signing up') {
              Alert.alert(responseJson);
              this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login'})]
              }));
            }

      }).catch((error) => {
        console.error(error);
      });

  }


  render() {
    return (

      <View style={styles.MainContainer}>
        <Card>
          <CardSection>
 
           <ScrollView style={styles.sdContainer}>
            <KeyboardAvoidingView behavior="padding"> 
              <Text style={styles.TextTag}>
                  Sign Up
              </Text>

              <TextInput style={styles.InputFlied}
                placeholder="Enter Fullname"
                returnKeyType='next'
                onSubmitEditing={()=> this.refs.txtun.focus()}
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_fullname: TextInputValue })}
              />

              <TextInput style={styles.InputFlied}
                placeholder="Enter Username"
                returnKeyType='next'
                ref={"txtun"}
                onSubmitEditing={()=> this.refs.txtem.focus()}
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_username: TextInputValue })}
              />

              <TextInput style={styles.InputFlied}
                placeholder="Email"
                returnKeyType='next'
                ref={"txtem"}
                onSubmitEditing={()=> this.refs.txtpass.focus()}
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_email: TextInputValue })}
              />

              <TextInput style={styles.InputFlied}
                placeholder="Enter Password"
                returnKeyType='next'
                ref={"txtpass"}
                onSubmitEditing={()=> this.refs.txtcm.focus()}
                secureTextEntry
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_password: TextInputValue })}

              />

              <TextInput style={styles.InputFlied}
                placeholder="Company"
                returnKeyType='next'
                ref={"txtcm"}
                onSubmitEditing={()=> this.refs.txtin.focus()}
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_company: TextInputValue })}
              />

              <TextInput style={styles.InputFlied}
                placeholder="Industry"
                ref={"txtin"}
                onSubmitEditing={()=> this.refs.txtin.focus()}
                returnKeyType='done'
                onChangeText={TextInputValue =>
                  this.setState({ TextInput_Industry: TextInputValue })}
              />
              </KeyboardAvoidingView>
              
              <TouchableOpacity style={styles.ButtonT}
                onPress={this.displayMessage} >
                <Text style={styles.textStyle}>Sign Up</Text>
              </TouchableOpacity>
              
              
            </ScrollView>

      </CardSection>
      </Card>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    marginTop:12,    
    marginLeft: 20,
    marginRight:20,
  },
  sdContainer:{
    flex:1,
    marginLeft:10,
    marginRight:10
  },
  TextTag:{
    fontSize: 18,
    margin: 2,
    textAlign:'center'
  },
  InputFlied: {
    margin: 4,
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  Buttons: {
    fontSize: 30,
    margin: 10,
    padding: 50
  },
  textStyle: {
    fontSize:20,
    color: '#ffffff',
    textAlign: 'center'
  },
  ButtonT: {
    flex: 1, 
    alignSelf: 'stretch',
    backgroundColor: '#007cc2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginTop:10,
    marginLeft: 5,
    marginRight: 5,
    padding:10
  }

});

AppRegistry.registerComponent('signUp', () => signUp);
