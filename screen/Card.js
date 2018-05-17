import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#007cc2',
    borderBottomWidth: 0,
    shadowColor: '#007cc2',
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 2
  }
};

export default Card;