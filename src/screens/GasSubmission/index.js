import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class GasSubmission extends React.Component {

    render() {
        return(
            <View style = {{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            

                    <Text style = {{fontSize: 23, fontWeight: 'bold', color: 'red', marginBottom: '8%'}}>
                        Congratulations!
                    </Text>

                    <View style = {{width: '80%', alignSelf: 'center'}}>
                    <Text style = {{fontSize: 17, alignSelf: 'center'}}>
                     Your request has been submitted and Admin will contact you soon!
                    </Text>
                    </View>

                    {/* <View style = {{width: '90%', alignSelf: 'center'}}>
                    <Text style = {{fontSize: 17, alignSelf: 'center'}}>
                        to you as soon as possible.
                    </Text>
                    </View> */}

                    <Text style = {{fontSize: 20, marginTop: '5%'}}>
                        Thanks for Interest!
                    </Text>

                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('First')}
                            style={{ height: 45, width: '70%', borderRadius: 10, alignSelf: 'center', backgroundColor: 'red', marginVertical: '10%' }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Raleway-Bold', color: 'white', alignSelf: 'center', marginVertical: 12 }}>Shop more</Text>
                        </TouchableOpacity>
             
            </View>
        )
    }
}