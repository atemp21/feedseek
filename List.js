import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Constants } from 'expo';

export default class List extends React.Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
      title: 'Results'
  };

  

  render(){
      return(
        <View>
            <Text>List component</Text>
        </View>
      );
  }

}