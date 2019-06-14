import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Constants } from 'expo';

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
                    console.log(this.state.places)
                });
            })
            .catch((error)=>{
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='#FA9D5C' size='large' />
                </View>
            );
        }
        return (
            <View>
                <FlatList 
                    data={this.state.places}
                    renderItem = {
                        ({item, index})=>
                        <Text >{item.name}</Text>
                    }
                    keyExtractor={(item, index)=>index.toString()}
                    ListEmptyComponent={()=>
                    <Text>Nothing Here</Text>
                    }
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

});