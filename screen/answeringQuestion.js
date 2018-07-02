import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Picker, ActivityIndicator} from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

import StarRating from 'react-native-star-rating';
import Card from './Card';
import CardSection from './CardSection';

export default class AnsweringQuestion extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'M-C-Q Question',    
  });

  constructor(props) {
    super(props);
    console.log(props);
    let qrID = this.props.navigation.state.params.qr_ID;
    let question_ID = this.props.navigation.state.params.question_ID;
    let question_Content = this.props.navigation.state.params.question_content;
    let userLoged = this.props.navigation.state.params.userLoged;
    this.state = {
      generalStarCount: 0,
      qrID:qrID,
      ID: question_ID,
      content: question_Content,  
      userLoged: userLoged,
      TextInput_Answer:'', 
      dataSource:[],
      isLoading: true,
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  componentDidMount() {   

    return fetch('http://www.224tech.com/sasPhp/mcqQuestionlistJson.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        ID : this.state.ID

      })
    }).then((response) => response.json())
     .then((responseJson) => {
      console.log('In CWM');
       console.log(responseJson);
       this.setState({
          dataSource: responseJson,
          isLoading: false,
       }, function() {
         // In this block you can do something with new state.
        
       });
       console.log(this.state.dataSource)
     })
     .catch((error) => {
       console.error(error);
     });     
  }

  displayMessage = () => {
        fetch('http://www.224tech.com/sasPhp/submitMCQAnswer.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            qID: this.state.ID,
            //Rating : this.state.generalStarCount,
            user : this.state.userLoged,
            answer : this.state.TextInput_Answer,
        })

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 'Rating submited!') {              
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'OnlineQuestion', params:{
                        url: this.state.qrID,
                      }})]
                    }));
                  }
            }).catch((error) => {
                console.error(error);
        });
  }

  render() {
    console.log('In render');
   let mcqData = this.state.dataSource[0];
    console.log(mcqData);
    const {dataSource} = this.state;
    if(this.state.isLoading){
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
      return (
        <View style={styles.container}>
          <Card>
              <CardSection> 
              {dataSource.map(data =>    
                  <View style={styles.container2} key={data.mcq_ID}>
                    
                      <Text style={styles.welcome}>
                          Question: {this.state.content}
                      </Text>
                  
                      <Text style={styles.instructions}>
                          A: {data.mcq_A }
                      </Text>
  
                      <Text style={styles.instructions}>
                          B: {data.mcq_B }
                      </Text>
  
                      <Text style={styles.instructions}>
                          C: {data.mcq_C }
                      </Text>
  
                      <Text style={styles.instructions}>
                          D: {data.mcq_D }
                      </Text>
                    
                      <View style={styles.RowWrapper}>
                          <Text style={styles.RowLabel}>Answer:</Text>
                          <Picker
                              selectedValue={this.state.TextInput_Answer}
                              style={{ height: 50, width: '100%' }}
                              onValueChange={(itemValue, itemIndex) => this.setState({TextInput_Answer: itemValue})}>
                              <Picker.Item label="Select an Answer" value="Select an Answer" />
                              <Picker.Item label="A" value="A" />
                              <Picker.Item label="B" value="B" />
                              <Picker.Item label="C" value="C" />
                              <Picker.Item label="D" value="D" />
                          </Picker>
                      </View>
  
                      <TouchableOpacity style={styles.Buttons}
                          onPress={this.displayMessage}>
                          <Text style={styles.txtStyles}>Submit</Text>
                      </TouchableOpacity>
                  </View>
                )}  
              </CardSection>
          </Card>     
        </View>
      );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginLeft:5,
    marginRight:5,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    justifyContent:'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
  star: {
    justifyContent:'center',
    paddingHorizontal: 3,
    opacity: 0,
  },
  Buttons: {
    width:250,
    alignSelf: 'center',
    backgroundColor: '#007cc2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginTop:20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom:10,
    padding:10,
    elevation: 2,
  },
  txtStyles: {
    fontSize:20,
    color: '#ffffff',
    textAlign: 'center'
  },
  RowWrapper :{
    width: '70%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  RowLabel :{
    width: '20%',
    marginLeft:35,
  }
});