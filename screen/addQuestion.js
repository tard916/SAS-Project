import React, { Component } from 'react';
import { StyleSheet, View,TextInput,Text, Platform, TouchableOpacity,Picker } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';


class Question extends React.Component {

  constructor(props) {
    console.log('addQuestion');
    console.log(props);
    super(props)
    let qr_ID = this.props.navigation.state.params.ID;
    this.state = {
      qr_ID:qr_ID,
      TextInput_Question: '',
      TextInput_A: '',
      TextInput_B: '',
      TextInput_C: '',
      TextInput_D: '',
      TextInput_Answer:'',
    }
  }
  static navigationOptions =    {
       title: 'Add New Question',
  }; 
  
  displayMessage = () => {
    fetch('http://www.224tech.com/sasPhp/addQuestion.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qr_ID:this.state.qr_ID,
        Question: this.state.TextInput_Question,
        A: this.state.TextInput_A,
        B: this.state.TextInput_B,
        C: this.state.TextInput_C,
        D: this.state.TextInput_D,
        Answer:this.state.TextInput_Answer
      })

    }).then((response) => response.json())
          .then((responseJson) => {				

            if (responseJson == 'Question added') {              
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

        <View style={styles.RowWrapper}>
          <Text style={styles.RowLabel}>Question:</Text>
          <TextInput
            placeholder="Question"
            returnKeyType='next'
            multiline = {true}
            editable = {true}
            maxLength = {400}
            onChangeText={ TextInputValue => this.setState({ TextInput_Question : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
        </View>

        <View style={styles.RowWrapper}>
          <Text style={styles.RowLabel}>A:</Text>
          <TextInput
            placeholder="Option A"
            returnKeyType='next'
            onChangeText={ TextInputValue => this.setState({ TextInput_A : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
        </View>

        <View style={styles.RowWrapper}>
          <Text style={styles.RowLabel}>B:</Text>
          <TextInput
            placeholder="Option B"
            returnKeyType='next'
            onChangeText={ TextInputValue => this.setState({ TextInput_B : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
        </View>

        <View style={styles.RowWrapper}>
          <Text style={styles.RowLabel}>C:</Text>
          <TextInput
            placeholder="Option C"
            returnKeyType='next'
            onChangeText={ TextInputValue => this.setState({ TextInput_C : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
        </View>

        <View style={styles.RowWrapper}>
          <Text style={styles.RowLabel}>D:</Text>
          <TextInput
            placeholder="Option D"
            returnKeyType='done'
            onChangeText={ TextInputValue => this.setState({ TextInput_D : TextInputValue }) }                       
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
           
          />
        </View>
        
          <View style={styles.RowWrapper}>
             
              <Text style={styles.RowLabel}>Answer:</Text>
              {(Platform.OS === 'android') ?
                <Picker
                  selectedValue={this.state.TextInput_Answer}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) => this.setState({TextInput_Answer: itemValue})}>
                  <Picker.Item label="Select an Answer" value="Select an Answer" />
                  <Picker.Item label="A" value="A" />
                  <Picker.Item label="B" value="B" />
                  <Picker.Item label="C" value="C" />
                  <Picker.Item label="D" value="D" />
                </Picker> : 
                    <TextInput
                      style={styles.TextInputStyleClass}
                      editable = {true}
                      placeholder="Select an Answer!"
                      returnKeyType='done'
                      onChangeText={ TextInputValue => this.setState({ TextInput_Answer : TextInputValue }) }/>                
              }         
            
          </View>
       
                  
        <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.displayMessage} >
            <Text style={styles.TextStyle}> Add Question</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

class Rating extends React.Component {

  constructor(props) {
      super(props)
      let qr_IDR = this.props.navigation.state.params.ID;
      this.state = {
        qr_ID:qr_IDR,
        TextInput_Question: '',
      }
  }

  static navigationOptions =  {
      title: 'Add New Rating Question',
  };

  UpdateQR = () =>{

          fetch('http://www.224tech.com/sasPhp/updateQR.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            qr_ID:this.state.qr_ID,
            Question: this.state.TextInput_Question,
          })

          }).then((response) => response.json())
              .then((responseJson) => {
                // Showing response message coming from server updating records.
                //Alert.alert(responseJson);

                if (responseJson == 'Question added') {              
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
      <View style={styles.MainContainerRating}>        
        <View style={styles.RowWrapperRating}>
          <Text style={styles.RowLabelRating}>Question:</Text>
          <TextInput
            placeholder="Question"
            multiline = {true}
            editable = {true}
            maxLength = {400}
            onChangeText={ TextInputValue => this.setState({ TextInput_Question : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClassRating}
          />
        </View>
        
        <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyleRating} onPress={this.UpdateQR} >

          <Text style={styles.TextStyle}> Add </Text>

        </TouchableOpacity>
     </View>

    );
  }

}

const styles = StyleSheet.create({

  MainContainer :{
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  MainContainerRating :{
    justifyContent: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  RowWrapper :{
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  RowWrapperRating :{
    width: '60%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },

  RowLabel :{
    width: '25%',
  },

  RowLabelRating :{
    width: '25%',
  },

  TextInputStyleClass: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#007cc2',
    borderRadius: 5 ,
    paddingLeft: 10,
  },
  TextInputStyleClassRating: {
    width: '75%',
    height: 100,
    borderWidth: 1,
    borderColor: '#007cc2',
    borderRadius: 5 ,
    paddingLeft: 10,
    margin: 10
  },

  TouchableOpacityStyle: {
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#007cc2'
  },

  TouchableOpacityStyleRating: {
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    margin: 10,
    width: '90%',
    backgroundColor: '#007cc2'
  },


  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});

export default TabNavigator({
  Question: {screen: Question},
  Rating: {screen: Rating},
},
{

  	tabBarPosition: 'bottom',
  	swipeEnabled: false,

});

