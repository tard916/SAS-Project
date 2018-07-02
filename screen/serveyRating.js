import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Alert,ActivityIndicator } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

import StarRating from 'react-native-star-rating';
import Card from './Card';
import CardSection from './CardSection';

export default class RatingQuestion extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'Rating Question',
    
  });

  constructor(props) {
    super(props);
    console.log(props);
    let question_ID = this.props.navigation.state.params.question_ID;
    let question_Content = this.props.navigation.state.params.question_content;
    let userLoged = this.props.navigation.state.params.userLoged;
    this.state = {
      generalStarCount: 0,
      ID: question_ID,
      content: question_Content,  
      userLoged:userLoged,
      dataSource:[],
      isLoading: true,   
    };
  }  

  componentDidMount() {   

    return fetch('http://www.224tech.com/sasPhp/ratingQuestionListResultJson.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        ID : this.state.ID,
        user : this.state.userLoged
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
                <View style={styles.container2}>
                    <Text style={styles.welcome}>
                        Question: {this.state.content}
                    </Text>
                
                    <Text style={styles.instructions}>
                        {`${data.ratings} of stars is displayed`}
                    </Text>
                    <StarRating
                        style={styles.star}
                        disabled={false}
                        maxStars={5}
                        rating={data.ratings}
                        fullStarColor={'#f4f142'}
                        //reversed
                        starSize={50}                        
                    />
                    
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
    marginTop: 25,
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
    textAlign: 'center',
    color: '#333333',
    margin: 20,
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
  }
});