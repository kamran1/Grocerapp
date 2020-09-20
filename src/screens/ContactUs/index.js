import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { NavigationEvents } from 'react-navigation';


var RandomNumber = 0;
export default class ContactUs extends React.Component {

    constructor(){

        super();
    
        this.state={
    
          // This is our Default number value
          NumberHolder : '',
    
        }
      }

      componentDidMount()
      {
       // BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
        this.randomNumberFN();
          this.GenerateRandomNumber();
      }

      randomNumberFN()
      {
        RandomNumber =parseFloat(Math.floor(Math.random() * 999999) + 100000) ;
        this.GenerateRandomNumber();
      }

     
    //   componentWillMount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    //  } 
    //  onBackButtonPressed() {
    //      this.props.navigation.navigate('ProductList');
    //      //return true;
    // }
      
      GenerateRandomNumber()
        {
            
            this.setState({
                NumberHolder : parseFloat(RandomNumber)
            })
        

        }

    render() {
        return(
            <View style = {{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <NavigationEvents
                                onDidFocus={() => this.randomNumberFN()}
                                />
            

                    <Text style = {{fontSize: 23, fontWeight: 'bold', color: 'red', marginBottom: '8%'}}>
                    Contact Details:
                    </Text>

                    <View style = {{width: '80%', alignSelf: 'center'}}>
                        <View style={{flexDirection: 'row',marginVertical: 5}}>
                            <Image style={{ height: 25, width: 25, borderRadius: 50 }}
                                source={require('../../images/call.png')}
                                resizeMode='contain' />
                                 <Text style={{fontSize: 16, marginLeft: 5}}>+92 316 9467371</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <Image style={{ height: 25, width: 25, borderRadius: 50 }}
                                source={require('../../images/mail.png')}
                                resizeMode='contain' />
                                 <Text style={{fontSize: 16, marginLeft: 5}}>Fatafatdelivery1041@gmail.com</Text>
                        </View>

                        {/* <View style={{flexDirection: 'row',marginVertical: 5}}>
                            <Image style={{ height: 25, width: 25, borderRadius: 50 }}
                                source={require('../../images/map.png')}
                                resizeMode='contain' />
                                 <Text style={{fontSize: 16, marginLeft: 5}}>+92 316 9467371</Text>
                        </View> */}
                           
                    </View>

                    {/* <View style = {{width: '90%', alignSelf: 'center'}}>
                    <Text style = {{fontSize: 17, alignSelf: 'center'}}>
                        to you as soon as possible.
                    </Text>
                    </View> */}

                    {/* <Text style = {{fontSize: 20, marginTop: '5%'}}>
                        Thanks for Response!
                    </Text> */}

                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('First')}
                            style={{ height: 45, width: '70%', borderRadius: 10, alignSelf: 'center', backgroundColor: 'red', marginVertical: '10%' }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Raleway-Bold', color: 'white', alignSelf: 'center', marginVertical: 12 }}>Shop more</Text>
                        </TouchableOpacity>
             
            </View>
        )
    }
}