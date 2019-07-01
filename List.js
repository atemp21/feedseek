import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Results'
    };

    state = {
        isLoading: true,
        places: [],
        stars:[],
        categories:[]
    }

    type = this.props.navigation.getParam('selected');
    location = this.props.navigation.getParam('location');
    distance = this.props.navigation.getParam('distance');
    number = this.props.navigation.getParam('number');
    coords = this.props.navigation.getParam('coords');

    componentDidMount() {
        this.getData();
        // console.log(this.type);
        // console.log(this.distance);
        // console.log(this.location);
        // console.log(this.number);
        console.log(this.coords);
    }


    getData=()=> {
        url = "https://api.yelp.com/v3/businesses/search?term=restaurants";
        if(this.coords != null){
            url+="&latitude="+this.coords.coords.latitude;
            url+="&longitude="+this.coords.coords.longitude;
        }else{
            url += "&location="+this.location;
        }
        url += "&radius="+(this.distance*1609);
        url+= "&limit="+this.number;

        if(this.type != ""){
            url+="&categories="+this.type.toLowerCase();
        }
        
        console.log(url)
        return fetch(url,{
            method: 'get',
            headers: {
                'Authorization': 'Bearer 1hT3jiJGfC5LFWa45U_qSBnxsWfCJs3bkBf-z1GsVo5ZHmPDX_TcS2oNZLV7B1Rkem7y1TuVt4wwaoqsMIVmmPU3CNWZvoseRJ_Vn75dyufuODh3Z55QKrP2m5DVXHYx'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    places: responseJson.businesses
                }, function () {
                    //console.log(this.state.places)
                    this.state.places.forEach(p => {
                        this.get_stars(p.rating);
                        if(p.categories[1]) this.state.categories.push(p.categories[1].title)
                        else this.state.categories.push(p.categories[0].title)
                    });
                    this.setState({isLoading: false});
                });
            })
            .catch((error)=>{
                console.error(error);
            });
    }


    get_stars = (rating)=>{
        path='';
        switch(rating){
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
       
        this.state.stars.push(path)
        // console.log("path"+path);
        // console.log("stars"+this.state.stars)
        // console.log(this.place.rating)
        
    }

    render() {
        const { navigation } = this.props;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='#FA9D5C' size='large' />
                </View>
            );
        }
        return (
            <ScrollView>
                <FlatList 
                    data={this.state.places}
                    renderItem = {
                        ({item, index})=>
                        <TouchableOpacity style={styles.place} onPress={()=>navigation.navigate('Place',{place: this.state.places[index]})}>
                            <Image style={styles.place_image} source={{uri: item.image_url}}/>
                            <View style={styles.text_box}>
                                <Text style={styles.place_name}>{item.name}</Text>
                                <Text style={styles.place_cat}>{this.state.categories[index]}</Text>
                                <Image source={this.state.stars[index]}/>
                                <Text style={styles.place_rating}>{item.review_count} ratings from Yelp</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index)=>index.toString()}
                    ListEmptyComponent={()=>
                    <View style={styles.no_results}>
                        <Text style={styles.no_results_text}>No Results to Show</Text>
                        <Text style={styles.no_results_text}>Try Again</Text>
                    </View>
                    }
                />
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    place:{
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 1,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text_box:{
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center'
    },
    place_image:{
        width: 100,
        height: 100
    },
    place_name:{
        fontSize: 20,
        color: '#220C10',
        fontWeight: 'bold'
    },
    place_cat:{
        color: '#3A414B'
    },
    place_rating:{
        color: '#3A414B',
        fontSize:11
    },
    no_results:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    no_results_text:{
        fontSize: 20,
        color: '#220C10',
        fontWeight: 'bold'
    }
});