import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Slider from "react-native-slider";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default class Home extends React.Component {
  constructor(props){
    super(props);

  }
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    distance: 1,
    places: 1,
    zip: null,
    selected:"",
    active: 0,
    location: null
  };

  componentDidMount(){
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({distanceInterval:1000});
    this.setState({ location });
    //console.log(location);
  };

  flagToggle(name, id){
    if(this.state.selected === name){
      this.setState({selected: ''});
    }else{
      this.setState({selected: name});
    }
   
    if(this.state.active === id){
      this.setState({active: 0});
    }else{
      this.setState({active: id});
    }
    //console.log('name', this.state.selected, 'active', this.state.active)
  }


  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.maincontainer}>
        <View style={styles.flagScroll}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {foodTypes.map((t,k) => {
              return (
                  <TouchableOpacity  key={t.id} style={styles.flagButton} 
                  onPress={this.flagToggle.bind(this, t.name, t.id)}>
                    {t.src}
                    <Text style={this.state.active == t.id ? styles.flagButtonTextActive : styles.flagButtonText}>{t.name}</Text>
                  </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        
          {(()=>{
            if(this.state.location != null){
              return(
              <View style={{alignItems:"center", marginTop:15, marginBottom:15}}>
              <Text style={styles.sliderText}>FeedSeek is using your location</Text>
              </View>)
            }else{
              return(
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
               </View>)
            }
          })()} 
        <View style={styles.hline}></View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>Within {this.state.distance} mile(s)</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#009BDB"
            maximumTrackTintColor="#CFD9EE"
            thumbTintColor="#FB5A62"
            thumbTouchSize={{width: 75, height: 75}}
            value={this.state.distance}
          onValueChange={distance => this.setState({ distance })}
          />
        </View>
        <View style={styles.hline}></View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>Show me {this.state.places} place(s)</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#009BDB"
            maximumTrackTintColor="#CFD9EE"
            thumbTintColor="#FB5A62"
            thumbTouchSize={{width: 75, height: 75}}
            value={this.state.places}
          onValueChange={places => this.setState({ places })}
          />
        </View>
        <View style={styles.hline}></View>
        <View style={{flex:1, alignItems:"stretch", width:250, marginTop:20}}>
          <TouchableOpacity style={styles.Button} 
          onPress={()=>{
            if(this.state.location != null || this.state.zip != null){
            navigation.navigate('List', {
            selected: this.state.selected,
            location: this.state.zip,
            distance: this.state.distance,
            number: this.state.places,
            coords: this.state.location
            
          })
        }else{
          Alert.alert(
            "Where are you?",
            "Enter your Zip Code or allow location",
            [
              {text: 'Enable Location', onPress: ()=> this._getLocationAsync()},
              {text: 'OK'}
            ]
            );
        }
        }}>
            <Text style={styles.buttonText}>See Results</Text>
          </TouchableOpacity>
        </View>
        <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-8102320953027550/8784654725" // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
        onDidFailToReceiveAdWithError={(e)=>this.bannerError(e)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar:{
    backgroundColor: '#009BDB',
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
    color: "#3A414B"
  },
  flagButtonTextActive:{
    color: '#009BDB'
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
    backgroundColor: '#009BDB',
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
    letterSpacing: 1
  },
  sliderText:{
      color: "#3A414B",
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
  // {
  //   id:0,
  //   name:"All",
  //   src:<Image source={require('./assets/flags/all.png')} style={styles.flag}/>
  // },
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
