import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class HelloWorld extends Component {
    constructor(props){
        super(props);
        console.log('Hello I am here');
        console.log(props );
        let sasUrl = 'http://www.224tech.com/sasPhp/findSection.php?id='+ this.props.navigation.state.params.ID;
        
        this.state= {
            sasUrl: sasUrl,
        };
    }    
  
 
  render() {
      let logoFile = require('../assets/images/saslogo.png')
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.sasUrl}
        />
        <QRCode
          value={this.state.sasUrl}
          logo={logoFile}
          size={300}
          bgColor='#ffffff'
          fgColor='#007cc2'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
 
