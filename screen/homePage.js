import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  ListView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import { SwipeListView , SwipeRow} from 'react-native-swipe-list-view';

import QuestionCList from "./questionCList";
import Card from './Card';
import CardSection from './CardSection';

class HomePage extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'QR-Code Scanner',
    headerLeft: null
  });

  constructor(props){
    super(props);
    console.log(props);
    let userLoged = this.props.navigation.state.params.userName;
    this.state = {
      isLoading: true,
      ID: '',
      userLoged: userLoged,
    }
  }

  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: 300,
                    width: 300,
                    marginTop: 25
                  }}
                />}

        {this._maybeRenderUrl()}
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return console.log(this.state);
    }
    if(this.state.lastScannedUrl) {
      this.props.navigation.navigate("OnlineQuestion",{url:this.state.lastScannedUrl, user : this.state.userLoged});
    }
    return (
      <View >
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

class JoinedSection extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'Joined Section',
    headerLeft: null
  });

  constructor(props){
    super(props);
    console.log(props);
    let userLoged = this.props.navigation.state.params.userName;
    this.state = {
      isLoading: true,
      ID: '',
      userLoged: userLoged,
    }
  }

  GetSectionIDFunction=(qr_ID, qr_Title,qr_Description)=>{
    this.props.navigation.navigate('ServeyQuestion', {
      qr_ID : qr_ID,
      qr_Title : qr_Title,
      qr_Description : qr_Description,
      userLoged:this.state.userLoged
    });
  }

  componentDidMount() {
    return fetch('http://www.224tech.com/sasPhp/sectionlistJson.php',{ method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({        
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
        <View style={{flex: 1, paddingTop: 20, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles2.container}>
       <SwipeListView          
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>            
            <View >
              <Card >
                <CardSection > 
                 <View style={styles2.standalone}>
                    <SwipeRow leftOpenValue={0} rightOpenValue={-0}>

                      <View style={styles2.standaloneRowBack}>
                        <View style={styles2.controls}>
                          <View style={styles2.switchContainer}>
                            
                          </View>
                        </View>
                      </View>
                      <View style={styles2.standaloneRowFront}>
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
            <View style={styles2.rowBack}>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  
  url: {
    flex: 1,
  },

  urlText: {
    color: '#fff',
    fontSize: 20,
  },

  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },

});

const styles2 = StyleSheet.create({
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

export default TabNavigator({
  HomePage: {screen: HomePage},
  JoinedSection: {screen: JoinedSection},
},
{
  	tabBarPosition: 'bottom',
  	swipeEnabled: false,

});
