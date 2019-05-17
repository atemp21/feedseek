import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {language: ''}
  render() {
    return (
      <View style={styles.maincontainer}>
        <View style={styles.statusBar}></View>
        <View style={styles.topbar}>
          <Text style={{color:'white', fontSize: 15, fontWeight: "bold"}}>Dinner Decider</Text>
        </View>
        <ScrollView>
          <TouchableOpacity>
            <Image/>
            <Text>Text bro</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar:{
    backgroundColor: '#00416d',
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
