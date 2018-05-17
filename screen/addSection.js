import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ScrollView, View, Button, Alert, StyleSheet,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

import Card from './Card';
import CardSection from './CardSection';

export default class AddSection extends Component {
	static navigationOptions= ({navigation}) =>({
			title: 'Add Qr Section',
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_SectionTitle: '',
      TextInput_SectionDescription: '',
      
    };
  }

  displayMessage = () => {
    fetch('http://www.224tech.com/sasPhp/addQrSection.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        SectionTitle : this.state.TextInput_SectionTitle,
        SectionDescription : this.state.TextInput_SectionDescription,
       

      })

    }).then((response) => response.json())
          .then((responseJson) => {				

            if (responseJson == 'Qr Section added') {              
              this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Admin'})]
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
            <View style={styles.MainContainer}>
    					<KeyboardAvoidingView behavior="padding">
                <Text style={styles.TextTag}>
                    Add  QR Section
                </Text>
                <TextInput style={styles.InputFlied}
                    placeholder="SECTION Title"

                    returnKeyType='next'
                    onSubmitEditing={()=> this.refs.txtpass.focus()}
                    onChangeText={TextInputValue =>
                    this.setState({ TextInput_SectionTitle: TextInputValue })}
                />
                <TextInput  style={styles.InputFlied}
                    placeholder="SECTION Description"
                    returnKeyType='done'

                    ref={"txtpass"}
                    onChangeText={TextInputValue =>
                    this.setState({ TextInput_SectionDescription: TextInputValue })}
                />
                <TouchableOpacity style={styles.Buttons}
                  onPress={this.displayMessage} >
                  <Text style={styles.txtStyles}>SAVE</Text>
                </TouchableOpacity>
                                                          
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
    textStyle: {
      fontSize: 18,
      color:'#007cc2'
    },
    txtStyles: {
      fontSize:20,
      color: '#ffffff',
      textAlign: 'center'
    },
   
  });

AppRegistry.registerComponent('AddSection', () => AddSection);
