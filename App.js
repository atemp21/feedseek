import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';
import Slider from '@react-native-community/slider';

export default class App extends React.Component {
  state = {language: ''}
  render() {

    return (
      <View style={styles.maincontainer}>
        <View style={styles.statusBar}></View>
        <View style={styles.topbar}>
          <Text style={{color:'white', fontSize: 15, fontWeight: "bold"}}>Dinner Decider</Text>
        </View>
        <ScrollView horizontal={true} style={styles.flagScroll}>
          {foodTypes.map((t,k) => {
            return (
                <TouchableOpacity key={t.id} style={styles.flagButton}>
                  {t.src}
                  <Text style={styles.flagButtonText}>{t.name}</Text>
                </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View>
          <Text>Distance: </Text>
          <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
        </View>
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

  flagButton:{
    padding:7,
    alignItems:"center"
  },
  flag:{
    width: 40,
    height: 40
  },
  flagButtonText:{

  },
  flagScroll:{
    height: 60,
    backgroundColor: '#F8F8F8'
  }

});

const foodTypes = [
  {
    id:0,
    name:"All",
    src:<Image source={require('./assets/flags/all.png')} style={styles.flag}/>
  },
  {
    id: 1,
    name: "American",
    src: <Image source={require('./assets/flags/united-states-of-america.png')} style={styles.flag}/>
  },
  {
    id:2,
    name: "Mexican",
    src: <Image source={require('./assets/flags/mexico.png')} style={styles.flag}/>
  },
  {
    id:3,
    name:"Chinese",
    src:<Image source={require('./assets/flags/china.png')} style={styles.flag}/>
  },
  {
    id:4,
    name:"Italian",
    src:<Image source={require('./assets/flags/italy.png')} style={styles.flag}/>
  },
  {
    id:5,
    name:"Japanese",
    src:<Image source={require('./assets/flags/japan.png')} style={styles.flag}/>
  },
  {
    id:6,
    name:"Korean",
    src:<Image source={require('./assets/flags/south-korea.png')} style={styles.flag}/>
  },
  {
    id:7,
    name:"Vietnamese",
    src:<Image source={require('./assets/flags/vietnam.png')} style={styles.flag}/>
  },
  {
    id:8,
    name:"Thai",
    src:<Image source={require('./assets/flags/thailand.png')} style={styles.flag}/>
  },
  {
    id:9,
    name:"Indian",
    src:<Image source={require('./assets/flags/india.png')} style={styles.flag}/>
  }
];
