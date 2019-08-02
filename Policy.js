import React from 'react';
import { WebView} from 'react-native';

export default class Policy extends React.Component {

    render(){
        return(
           <WebView
            source={{uri: 'https://app.termly.io/document/privacy-policy/071b376e-c5ab-4b02-a5eb-fc695635869a'}}

           />
        )
    }

}