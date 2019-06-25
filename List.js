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
        places: []
    }

    componentDidMount() {
        this.getData();
    }

    type = this.props.navigation.getParam('selected');
    location = this.props.navigation.getParam('location');
    distance = this.props.navigation.getParam('distance');
    number = this.props.navigation.getParam('number');

    getData() {
        url = "https://api.yelp.com/v3/businesses/search?term=restaurants";
        url += "&location="+this.location;
        url += "&radius="+(this.distance*1609);
        url+= "&limit="+this.number;

        if(this.type != ""){
            url+="&categories="+this.type;
        }
        url+="&sort_by=rating&open_now=true";

        return fetch(url,{
            method: 'get',
            headers: {
                'Authorization': 'Bearer 1hT3jiJGfC5LFWa45U_qSBnxsWfCJs3bkBf-z1GsVo5ZHmPDX_TcS2oNZLV7B1Rkem7y1TuVt4wwaoqsMIVmmPU3CNWZvoseRJ_Vn75dyufuODh3Z55QKrP2m5DVXHYx'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    places: responseJson.businesses
                }, function () {
                    //console.log(this.state.places)
                });
            })
            .catch((error)=>{
                console.error(error);
            });
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
                                <Text style={styles.place_cat}>{item.categories[1].title}</Text>
                                <Text style={styles.place_rating}>rating: {item.rating}</Text>
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
        color: '#a8a8a8',
        fontWeight: 'bold'
    },
    place_cat:{
        color: '#b5b5b5'
    },
    place_rating:{
        color: '#b5b5b5'
    },
    no_results:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    no_results_text:{
        fontSize: 20,
        color: '#a8a8a8',
        fontWeight: 'bold'
    }
});