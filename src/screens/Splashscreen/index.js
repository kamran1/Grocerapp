import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';


export default class Splashscreen extends React.Component{

    render() {
        return(
            <View style = {styles.container}>

                <Image source = {require('../../images/unial.jpg')} resizeMode = 'contain'
                 style = {{height: '35%', width: '55%', alignSelf: 'center', marginTop: '10%', borderRadius: 50}}></Image>

                 <View style = {{flexDirection: 'row', alignSelf: 'center'}}>

                    <Image source = {require('../../images/fbsplash.png')} resizeMode = 'stretch'
                    style = {{height: 40, width: 40, marginTop: '40%', marginHorizontal: '6%'}}></Image>

                    <Image source = {require('../../images/googlesplash.png')} resizeMode = 'stretch'
                    style = {{height: 40, width: 40, marginTop: '40%'}}></Image>

                    <Image source = {require('../../images/loginsplash.png')} resizeMode = 'stretch'
                    style = {{height: 40, width: 40, marginTop: '40%', marginHorizontal: '6%'}}></Image>

                 </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Newsignup')}>
                 <Text style = {{fontSize: 25, fontFamily: 'Raleway-Bold', color: 'black', alignSelf: 'center', marginTop: '15%'}}>
                     Create NEW Account
                 </Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress = {() => this.props.navigation.navigate('Drawer')}>
                 <Text style = {{fontSize: 25, textDecorationLine: 'underline', fontFamily: 'Raleway-Bold', color: 'black', alignSelf: 'center', marginTop: '10%'}}>
                     Skip
                 </Text>
                 </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

});