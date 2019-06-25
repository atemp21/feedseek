import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
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
        isLoading: true,
        place: this.place
    }

    componentDidMount(){
        console.log(this.place)
        
    }

    render(){
        if(this.state.isLoading){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='#FA9D5C' size='large' />
            </View>
        );
        }

        return(
            <ScrollView>
                <View style={styles.title_view}>
                    <Image src={{uri: this.place.image_url}}/>
                    <Text>{this.place.name}</Text>
                    <Text>rating: {this.place.rating}</Text>
                    <Text>price: {this.place.price}</Text>
                    <Text>distance: {this.place.distance/1609.34} mi</Text>
                </View>
                <View>
                    <Text>{this.place.display_phone}</Text>
                    <Text>{this.place.address1} {this.place.adress2}</Text>
                    <Text>{this.place.city}, {this.place.state} {this.place.zip}</Text>
                </View>
                <View>
                    
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    title_view:{
        flex: 1,
        flexDirection: 'column'
    }
})