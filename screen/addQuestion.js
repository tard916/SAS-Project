import React, { Component } from 'react';
import b64 from 'base64-js';
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator, Switch } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';

class Question extends React.Component {

  constructor(props) {

       super(props)

       this.state = {

         TextInput_ID: '',
         TextInput_Username: '',
         TextInput_Fullname: '',
         TextInput_Email: '',
         TextInput_Password: '',
         

       }

     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      /*this.setState({
        TextInput_ID : this.props.navigation.state.params.id,
        TextInput_Username : this.props.navigation.state.params.username,
        TextInput_Fullname: this.props.navigation.state.params.name,
        TextInput_Email: this.props.navigation.state.params.email,
        TextInput_Password: this.props.navigation.state.params.password,
        
      })*/

     }

    static navigationOptions =
    {
       title: 'Add New Question',
    };

    UpdateMemberRecord = () =>{

            fetch('http://www.224tech.com/reactPhp/updateMember.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id : this.state.TextInput_ID,

              username : this.state.TextInput_Username,

              fullname : this.state.TextInput_Fullname,

              email : this.state.TextInput_Email,

              password : this.state.TextInput_Password,

              isVerified : (this.state.Switch_IsVerified==true) ? 1 : 0


            })

            }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Updated Successfully!') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

      }


    DeleteMemberRecord = () =>{

          fetch('http://www.224tech.com/reactPhp/deleteMember.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            username : this.state.TextInput_Username

          })

          }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
             console.error(error);
          });


          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
          }));

    }

      SwitchGo(value){
        this.setState({
          Switch_IsVerified:value
        });
      }


    render() {
      return (

   <View style={styles.MainContainer}>

         

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Question:</Text>
            <TextInput

              placeholder="Question"

              //value={}

              //onChangeText={ TextInputValue => this.setState({ TextInput_Username : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>A::</Text>
            <TextInput

              placeholder="Option A"

              //value={this.state.TextInput_Fullname}

             // onChangeText={ TextInputValue => this.setState({ TextInput_Fullname : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>B:</Text>
            <TextInput

              placeholder="Option B"

              //value={this.state.TextInput_Email}

              //onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>C:</Text>
            <TextInput

              placeholder="Option C"

              //value={this.state.TextInput_Password}

              //onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>D:</Text>
            <TextInput

              placeholder="Option D"

              //value={this.state.TextInput_Password}

              //onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateMemberRecord} >

            <Text style={styles.TextStyle}> Add </Text>

         </TouchableOpacity>

        


   </View>

      );
    }

}

class Rating extends React.Component {

  constructor(props) {

       super(props)

       this.state = {

         TextInput_ID: '',
         TextInput_Username: '',
         TextInput_Fullname: '',
         TextInput_Email: '',
         TextInput_Password: '',
         

       }

     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      /*this.setState({
        TextInput_ID : this.props.navigation.state.params.id,
        TextInput_Username : this.props.navigation.state.params.username,
        TextInput_Fullname: this.props.navigation.state.params.name,
        TextInput_Email: this.props.navigation.state.params.email,
        TextInput_Password: this.props.navigation.state.params.password,
        
      })*/

     }

    static navigationOptions =
    {
       title: 'Add New Rating Question',
    };

    UpdateMemberRecord = () =>{

            fetch('http://www.224tech.com/reactPhp/updateMember.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id : this.state.TextInput_ID,

              username : this.state.TextInput_Username,

              fullname : this.state.TextInput_Fullname,

              email : this.state.TextInput_Email,

              password : this.state.TextInput_Password,

              isVerified : (this.state.Switch_IsVerified==true) ? 1 : 0


            })

            }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Updated Successfully!') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

      }


    DeleteMemberRecord = () =>{

          fetch('http://www.224tech.com/reactPhp/deleteMember.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            username : this.state.TextInput_Username

          })

          }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
             console.error(error);
          });


          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
          }));

    }

      SwitchGo(value){
        this.setState({
          Switch_IsVerified:value
        });
      }


    render() {
      return (

   <View style={styles.MainContainerRating}>

          
          <View style={styles.RowWrapperRating}>
            <Text style={styles.RowLabelRating}>Question:</Text>
            <TextInput
              placeholder="Question"
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClassRating}
            />
          </View>
          
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyleRating} onPress={this.UpdateMemberRecord} >

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