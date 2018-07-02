import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

import Card from './Card';
import CardSection from './CardSection';
 
export default class HelloWorld extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'QR CODE',
    });

    constructor(props){
        super(props);        
        console.log(props);
        let sasUrl =  this.props.navigation.state.params.ID;        
        this.state= {
            sasUrl: sasUrl,
        };
        console.log(sasUrl);
    }    
  
 
  render() {
     
    return (
      <View style={styles.container}>
        <Card >
            <CardSection > 
                <View style={styles.container}>
                    <TextInput
                    style={styles.input}
                    value={this.state.sasUrl}
                    />
                    <QRCode
                    value={this.state.sasUrl}
                    size={200}
                    bgColor='purple'
                    fgColor='white'
                    marginBottom={20}/>
                </View>       
            </CardSection > 
        </Card >
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:30,
        marginLeft:30,
        marginRight:30,
        marginBottom:50        
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        padding: 5,
    }
});
 
