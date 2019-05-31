import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import { Constants } from 'expo';
import Slider from "react-native-slider";

export default class Home extends React.Component {
  state = {
    distance: 1,
    places: 1,
    zip: ""
  }
  render() {
    return (
      <View style={styles.maincontainer}>
        <View style={styles.statusBar}></View>
        <View style={styles.topbar}>
          <Text style={{color:'white', fontSize: 15, fontWeight: "bold"}}>Dinner Decider</Text>
        </View>
        <View style={styles.flagScroll}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {foodTypes.map((t,k) => {
              return (
                  <TouchableOpacity key={t.id} style={styles.flagButton}>
                    {t.src}
                    <Text style={styles.flagButtonText}>{t.name}</Text>
                  </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{alignItems:"center", marginTop:15, marginBottom:15}}>
          <Text style={styles.sliderText}>Zip Code</Text>
          <TextInput
            style={{backgroundColor:"#F2F2F2", width:100, height:35, textAlign:"center", fontSize:15}}
            maxLength={5}
            keyboardType="number-pad"
            placeholder="Enter"
            onChangeText={(zip) => this.setState({zip})}
            value={this.state.zip}
           >
          </TextInput>
        </View>
        <View style={styles.hline}></View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>Within {this.state.distance} mile(s)</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#FC6E0B"
            maximumTrackTintColor="#FA9D5C"
            thumbTintColor="#FF964D"
            thumbTouchSize={{width: 75, height: 75}}
            value={this.state.distance}
          onValueChange={distance => this.setState({ distance })}
          />
        </View>
        <View style={styles.hline}></View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>Show me {this.state.places} places</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#FC6E0B"
            maximumTrackTintColor="#FA9D5C"
            thumbTintColor="#FF964D"
            thumbTouchSize={{width: 75, height: 75}}
            value={this.state.places}
          onValueChange={places => this.setState({ places })}
          />
        </View>
        <View style={styles.hline}></View>
        <View style={{flex:1, alignItems:"stretch", width:250, marginTop:20}}>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.buttonText}>Decide Dinner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar:{
    backgroundColor: '#FA9D5C',
    height: Constants.statusBarHeight,
    width: '100%'
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: "100%"
  },
  topbar:{
    backgroundColor: '#FA9D5C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 75
  },

  flagButton:{
    padding:10,
    alignItems:"center"
  },
  flag:{
    width: 40,
    height: 40
  },
  flagButtonText:{
    color: "gray"
  },
  flagScroll:{
    height: 85,
    padding:5,
    borderBottomColor:"#F2F2F2",
    borderBottomWidth:1
  },
  sliderContainer:{
    alignItems:"stretch",
    justifyContent:"center",
    width:250,
    height: 100
  },

  Button:{
    backgroundColor: '#FA9D5C',
    padding: 10,
    height: 55,
    width: 250,
    borderRadius: 50,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2
  },
  sliderText:{
      color: "gray",
      fontSize: 18,

  },
  hline:{
    borderBottomColor:"#F2F2F2",
    borderBottomWidth:1,
    width:"100%",
    height:1
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
