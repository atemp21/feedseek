import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default class Place extends React.Component {
    constructor(props) {
        super(props);
    }

    place = this.props.navigation.getParam('place');

    static navigationOptions = {
        title: 'Details'
    };

    state = {
        stars: [],
        cat: ''
    }

    componentDidMount(){
        //console.log(this.place)
        this.get_stars();
        if(this.place.categories[1]) this.setState({cat: this.place.categories[1].title})
                        else this.setState({cat: this.place.categories[0].title})
    }

    call=()=>{
     Linking.openURL(`tel: ${this.place.phone}`);
    }

    get_directions=()=>{
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${this.place.coordinates.latitude},${this.place.coordinates.longitude}`;
            const label = 'Custom Label';
            const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
            });
        Linking.openURL(url);
    }

    go_to_yelp = () =>{
         Linking.openURL(this.place.url);
   
    }

    get_stars = ()=>{
        path='';
        switch(this.place.rating){
            case 0:
                path=require('./assets/yelp_stars/stars_small_0.png');
            break;
            case 1:
                path=require('./assets/yelp_stars/stars_small_1.png');
            break;
            case 1.5:
                path=require('./assets/yelp_stars/stars_small_1_half.png');
            break;
            case 2:
                path=require('./assets/yelp_stars/stars_small_2.png');
            break;
            case 2.5: 
                path=require('./assets/yelp_stars/stars_small_2_half.png');
            break;
            case 3:
                path=require('./assets/yelp_stars/stars_small_3.png');
            break;
            case 3.5: 
                path=require('./assets/yelp_stars/stars_small_3_half.png');
            break;
            case 4:
                path=require('./assets/yelp_stars/stars_small_4.png');
            break;
            case 4.5:
                path=require('./assets/yelp_stars/stars_small_4_half.png');
            break;
            case 5:
                path=require('./assets/yelp_stars/stars_small_5.png');
            break;
        }
       
        this.setState({stars: path})
        // console.log("path"+path);
        // console.log("stars"+this.state.stars)
        // console.log(this.place.rating)
        
    }

    render(){
      
        return(
            <ScrollView style={{flex: 1}}>
                <View style={styles.image_view}>
                    <Image style={styles.image} resizeMode='cover' source={{uri: this.place.image_url}}/>
                </View>
                <Text style={styles.title}>{this.place.name}</Text>
                <View style={styles.title_view}>
                    <View style={{flex: 1, flexDirection:'column'}}>
                        
                        <Image source={this.state.stars}/><Text style={styles.rating}>{this.place.review_count} reviews from Yelp</Text>
                        <Text style={styles.price}>Price: <Text style={{color:'green'}}>{this.place.price}</Text></Text>
                        <Text style={styles.distance}>Distance: {(this.place.distance/1609.34).toFixed(2)} mi</Text>
                        <Text style={styles.distance}>{this.state.cat}</Text>
                    </View>
                    <View style={styles.yelp}>
                        <TouchableOpacity style={{flex:1, flexDirection:'column', alignItems:'center'}} onPress={this.go_to_yelp}>
                            <Image style={{width: 85, height: 75}} source={require('./assets/Yelp_trademark_RGB_outline.png')}/>
                            <Text style={{color:'gray', fontSize:15, marginLeft:5}}>See more on Yelp</Text>
                        </TouchableOpacity>
                     </View>
                </View>
                <View style={styles.contact_view}>
                    <Text style={styles.phone}>{this.place.display_phone}</Text>
                    <Text style={styles.phone}>{this.place.location.display_address[0]} </Text>
                    <Text style={styles.phone}>{this.place.location.display_address[1]} </Text>
                </View>

                <View style={styles.button_view}>
                    <TouchableOpacity style={styles.call} onPress={this.call}>
                        <Text style={styles.button_text}>Call Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.directions} onPress={this.get_directions}>
                        <Text style={styles.button_text}>Get Directions</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    image_view:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'stretch'
    },
    title_view:{
        padding: 10,
        flex:1,
        flexDirection:'row'
    },
    image:{
        width: '100%',
        height: 200,
        alignSelf: 'center',
    },
    title:{
        fontSize: 28, 
        fontWeight: 'bold',
        color: '#220C10'
    },
    rating:{
        fontSize: 11,
        color: '#3A414B'
    },
    price:{
        fontSize: 17,
        color: '#3A414B'
    },
    distance:{
        fontSize: 17,
        color: '#3A414B'
    },
    contact_view:{
        padding:10
    },
    phone:{
        fontSize: 17,
        color: '#3A414B'
    },
    address:{
        fontSize: 17,
        color: '#3A414B'
    },
    button_view:{
        flex:1,
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    call:{
        backgroundColor:'#009BDB',
        width: 150,
        height: 50,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    directions:{
        backgroundColor:'#FB5A62',
        width: 150,
        height: 50,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    button_text:{
        color:"white",
        fontSize: 15,
        fontWeight:'bold'
    },
    yelp:{
        flex:1,
        flexDirection:'row',
        paddingLeft: 20,
        alignItems: 'center'
    }
});