import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Results'
    };

    state = {
        isLoading: true
    }

    componentDidMount() {
        this.getData();
    }

    type = this.props.navigation.getParam('selected');
    location = this.props.navigation.getParam('location');
    distance = this.props.navigation.getParam('distance');
    number = this.props.navigation.getParam('number');

    getData() {
        return fetch('url')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {

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
                <Text>List component</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});