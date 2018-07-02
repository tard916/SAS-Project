import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Alert, ActivityIndicator,TouchableOpacity,
  TouchableHighlight, } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'; // 4.2.0
import ActionButton from 'react-native-action-button'; // 2.7.2
import { SwipeListView , SwipeRow} from 'react-native-swipe-list-view';
import AddQuestion from "./addQuestion";

import RatingQuestion from "./ratingQuestion";
import Card from './Card';
import CardSection from './CardSection';

export default class Questions extends Component {
  static navigationOptions= ({navigation}) =>({
      title: 'Question List',
      headerLeft: null    
    });

  constructor(props){
      super(props);
      console.log('Question');
      console.log(props);
      let txtQr_ID = this.props.navigation.state.params.url;
      let userLoged = this.props.navigation.state.params.user;
      this.state = {
        isLoading: true,
        txtQr_ID : txtQr_ID,
        userLoged:userLoged
      }
  }

  GetSectionIDFunction=(question_ID, question_content, question_Type)=>{
    console.log(question_Type);
    if(question_Type == 'MCQ'){
      this.props.navigation.navigate('AnsweringQuestion', {
        qr_ID: this.state.txtQr_ID,
        question_ID : question_ID,
        question_content :question_content,
        userLoged:this.state.userLoged
      });
    } else if(question_Type == 'Rating'){
      this.props.navigation.navigate('RatingQuestion', {
        qr_ID: this.state.txtQr_ID,
        question_ID : question_ID,
        question_content :question_content,
        userLoged:this.state.userLoged
      });
    }
    
  }
  
  componentDidMount() {   

    return fetch('http://www.224tech.com/sasPhp/customerQuestionlistJson.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        ID : this.state.txtQr_ID,
        user : this.state.userLoged

      })
    }).then((response) => response.json())
     .then((responseJson) => {
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
       }, function() {
         // In this block you can do something with new state.
        
       });
     })
     .catch((error) => {
       console.error(error);
     });     
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
       <SwipeListView          
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>            
            <View >
              <Card >
                <CardSection > 
                 <View style={styles.standalone}>
                    <SwipeRow leftOpenValue={0} rightOpenValue={-0}>

                      <View style={styles.standaloneRowBack}>
                        <View style={styles.controls}>
                          <View style={styles.switchContainer}>
                           
                          </View>
                        </View>
                      </View>
                      <View style={styles.standaloneRowFront}>
                        <TouchableOpacity
                          onPress={
                            this.GetSectionIDFunction.bind(
                              this,rowData.question_ID,
                              rowData.question_content,
                              rowData.question_Type,
                          )}>
                          <Text>
                            ID: {` ${rowData.question_ID} `}
                          </Text>

                          <Text>
                            Title: {` ${rowData.question_content}`}
                          </Text>
                          
                        </TouchableOpacity>
                      </View>
                      </SwipeRow>
                    </View>
                </CardSection>
              </Card>
            </View>          
          }
          renderHiddenItem={ (dataSource) => (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <Text>Right</Text>
            </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        />
      </View>
    );
  }
}

const _gevWarning = () =>{
  Alert.alert(
    'Warning',
    'Are you sure you want to delete ?',
    [
      {text: 'No', onPress: ()=> console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: ()=>{
        console.log('Ask me later pressed')
      }},
    ],
    {cancelable: true}
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  standalone: {
    marginTop: 1,
    marginBottom: 1,
  },
  standaloneRowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width:'100%',
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width:'100%',
  },
  backTextWhite: {
    color: '#FFF',
  },
  controls: {
    alignItems: 'center',
    marginBottom: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
   
  },
  switchLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#007cc2',
    paddingVertical: 5,
    width: 109,
    height: 48,
    marginTop:2,
    marginLeft: 2,
    marginRight: 3,
    marginBottom: 2,
  },
  switchRight: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#007cc2',
    paddingVertical: 5,
    width: 110,
    height: 48,
    marginTop:2,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  txtStyles: {
    fontSize:12,
    color: '#ffffff',
    textAlign: 'center'
  },
});
