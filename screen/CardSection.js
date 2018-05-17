import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
      <View style={styles.containerStyle}>
        {props.children}
      </View>
    );
};

const styles = {
  containerStyle: {
    width:'100%',
    borderRadius: 10,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#007cc2',
    position: 'relative',
    elevation: 8
  }
};

export default CardSection;