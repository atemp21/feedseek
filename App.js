import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {language: ''}
  render() {
    return (
      <View style={styles.maincontainer}>
      <View style={styles.statusBar}></View>
      <View style={styles.topbar}>
      <Text style={{color:'white'}}>Choose filters:</Text>
      </View>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 200}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar:{
    backgroundColor: 'red',
    height: Constants.statusBarHeight,
    width: '100%'
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  topbar:{
    backgroundColor: '#00416d',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 75
  },
 
});
