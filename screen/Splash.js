import React, {Component} from 'react';
import {StyleSheet, Text, View, Image,Animated} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BgAudio from 'react-native-background-audio';


import Login from './login';


class FadeInView extends React.Component {
	state = {
	  fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
	}
  
	componentDidMount() {
	  Animated.timing(                  // Animate over time
		this.state.fadeAnim,            // The animated value to drive
		{
		  toValue: 1,                   // Animate to opacity: 1 (opaque)
		  duration: 3000,              // Make it take a while
		}
	  ).start();                        // Starts the animation
	}
  
	render() {
	  let { fadeAnim } = this.state;
  
	  return (
		<Animated.View                 // Special animatable View
		  style={{
			...this.props.style,
			opacity: fadeAnim,         // Bind opacity to animated value
		  }}
		>
		  {this.props.children}
		</Animated.View>
	  );
	}
  }

  const audio_options = {
	source:{local: require('../assets/music/m1.mp3')}  //ex. require('./music/sample.mp3')
  }

export default class Splash extends Component{
	static navigationOptions = { title: 'Welcome', header: null };
	constructor(props){
	 super(props)
	 
	}

	render() {
		//const {navigate} = this.props.navigation;
			setTimeout(() => {
			    //navigate('login'); 
			    this.props.navigation.navigate('Login')
			}, 5000);

		return(
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<FadeInView style={{width: 275, height: 183}}>
						<Image style={styles.logo} 
							source={require('../assets/images/sas1.png')}>
						</Image>
					</FadeInView>
					<BgAudio options={audio_options}></BgAudio>					
				</View>
			</View>			
		);		
	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: 'white',
	},
	logoContainer: {		
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width:275,
		height: 183,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center',
		marginTop: 5,
		opacity: 0.9,
		color: '#333333'
	}
})