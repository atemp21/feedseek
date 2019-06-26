import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
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
        stars: ''
    }

    componentDidMount(){
        console.log(this.place)
        this.get_stars();
    }

    call(){

    }

    get_directions(){

    }

    go_to_yelp(){
        Linking.canOpenURL(this.place.url)
        .then((supported) => {
            if (!supported) {
            console.log("Can't handle url: " + this.place.url);
            } else {
            return Linking.openURL(this.place.url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
    }

    get_stars(){
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

        this.setState({stars: [path]});
    }

    render(){
      
        return(
            <ScrollView style={{flex: 1}}>
                <View style={styles.image_view}>
                    <Image style={styles.image} resizeMode='cover' source={{uri: this.place.image_url}}/>
                </View>
                <View style={styles.title_view}>
                    <Text style={styles.title}>{this.place.name}</Text>
                    <Image source={this.state.stars}/><Text style={styles.rating}>{this.place.review_count} reviews from Yelp</Text>
                    <Text style={styles.price}>Price: <Text style={{color:'green'}}>{this.place.price}</Text></Text>
                    <Text style={styles.distance}>Distance: {(this.place.distance/1609.34).toFixed(2)} mi</Text>
                </View>
                <View style={styles.contact_view}>
                    <Text style={styles.phone}>{this.place.display_phone}</Text>
                    <Text style={styles.address1}>{this.place.address} {this.place.address2}</Text>
                    <Text style={styles.address2}>{this.place.city} {this.place.state} {this.place.zip}</Text>
                </View>
                <View style={styles.yelp}>
                    <TouchableOpacity style={{flex:1, flexDirection:'row', alignItems:'center'}} onPress={this.go_to_yelp}>
                         <Image style={{width: 85, height: 75}} source={require('./assets/Yelp_trademark_RGB_outline.png')}/>
                         <Text style={{color:'gray', fontSize:15, marginLeft:5}}>See more on Yelp</Text>
                    </TouchableOpacity>
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
        padding: 10
        
    },
    image:{
        width: '100%',
        height: 200,
        alignSelf: 'center',
    },
    title:{
        fontSize: 28, 
        fontWeight: 'bold',
        color: '#545454'
    },
    rating:{
        fontSize: 11,
        color: 'gray'
    },
    price:{
        fontSize: 17,
        color: 'gray'
    },
    distance:{
        fontSize: 17,
        color: 'gray'
    },
    contact_view:{
        padding:10
    },
    phone:{
        fontSize: 17,
        color: 'gray'
    },
    address:{
        fontSize: 17,
        color: 'gray'
    },
    button_view:{
        flex:1,
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    call:{
        backgroundColor:'#76a8f7',
        width: 150,
        height: 50,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    directions:{
        backgroundColor:'#2acc53',
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
        paddingLeft: 20
    }
});