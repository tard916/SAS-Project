import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView, 
  Alert, 
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight, } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'; // 4.2.0
import ActionButton from 'react-native-action-button'; // 2.7.2
import { SwipeListView , SwipeRow} from 'react-native-swipe-list-view';


import AddSection from "./addSection";
import AddQuestion from "./addQuestion";
import EditSection from "./editSection";
import QrOrQuestion from "./qrOrQuestion";
import Question from "./questions";
import QrGenerator from "./qrGenerator";
import Card from './Card';
import CardSection from './CardSection';

export default class Admin extends Component {
  static navigationOptions= ({navigation}) =>({
      title: 'QR Section List',
      headerLeft: null
  });

  constructor(props){
      super(props);
      this.state = {
        isLoading: true,
        ID: ''
      }
  }

  GetSectionIDFunction=(qr_ID, qr_Title,qr_Description)=>{
    this.props.navigation.navigate('Question', {
      qr_ID : qr_ID,
      qr_Title : qr_Title,
      qr_Description : qr_Description
    });
  }

  EditSectionIDFunction=(qr_ID, qr_Title,qr_Description)=>{
    this.props.navigation.navigate('EditSection', {
      qr_ID : qr_ID,
      qr_Title : qr_Title,
      qr_Description : qr_Description
    });
  }

  _gevWarning = (qr_ID) =>{
    let QRID = qr_ID;
    Alert.alert(
      'Warning',
      'Are you sure you want to delete ?',
      [
        {text: 'No', onPress: ()=> console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: ()=> this.DeleteSectionRecord(QRID)  },
      ],
      {cancelable: true}
    );
  }

DeleteSectionRecord = (QRID) =>{
    console.log(QRID);
    fetch('http://www.224tech.com/sasPhp/deleteSection.php', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'data-Type': 'json'
    },
    body: JSON.stringify({      
     ID :QRID
    })

  })
  
  .then((response) => {console.log(response);  return response.json();})
  .then((responseJson) => {

    // Showing response message coming from server updating records.
    Alert.alert(responseJson);

    if (responseJson == "Qr Section Deleted") {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Admin'})]
      }));
    }

  }).catch((error) => {
    console.error(error);
  });

}

  
componentDidMount() {
  return fetch('http://www.224tech.com/sasPhp/seminarlistJson.php')
    .then((response) => response.json())
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
                    <SwipeRow leftOpenValue={121} rightOpenValue={-118}>

                      <View style={styles.standaloneRowBack}>
                        <View style={styles.controls}>
                          <View style={styles.switchContainer}>
                            <TouchableOpacity
                              style={styles.switchLeft}
                              onPress={this._gevWarning.bind(
                                this,rowData.qr_ID,
                                rowData.qr_Title,
                                rowData.qr_Description)} >
                              <Text style={styles.txtStyles}>DELETE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.switchRight}
                              onPress={this.EditSectionIDFunction.bind(
                                this,rowData.qr_ID,
                                rowData.qr_Title,
                                rowData.qr_Description
                              )}>
                              <Text style={styles.txtStyles}>EDIT</Text>
                            </TouchableOpacity>

                          </View>
                        </View>
                      </View>
                      <View style={styles.standaloneRowFront}>
                        <TouchableOpacity
                          onPress={
                            this.GetSectionIDFunction.bind(
                              this,rowData.qr_ID,
                              rowData.qr_Title,
                              rowData.qr_Description
                          )}>
                          <Text>
                            ID: {` ${rowData.qr_ID} `}
                          </Text>

                          <Text>
                            Title: {` ${rowData.qr_Title}`}
                          </Text>
                          <Text>
                            Description: {` ${rowData.qr_Description}`}
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
       
          <ActionButton buttonColor="#3498db" >
            <ActionButton.Item buttonColor='#007cc2' title="Add Section" onPress={() => this.props.navigation.navigate('AddSection')}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor="rgba(231,76,60,1)" title="Logout" onPress={() => this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login'})]
              }))}>
              <Icon name="ios-log-out" style={styles.actionButtonIcon} />
            </ActionButton.Item>          
          </ActionButton>
       
      </View>
    );
  }
} 

const SectionManager = StackNavigator({
    Admin: {screen: Admin},
    AddSection: {screen: AddSection},
    AddQuestion: {screen: AddQuestion},
    EditSection: {screen: EditSection},
    Question: {screen: Question},
    QrOrQuestion: {screen: QrOrQuestion},
    QrGenerator: {screen: QrGenerator},
});

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
