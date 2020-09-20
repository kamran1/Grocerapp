import React, { useState } from 'react'
import {TouchableOpacity, View, Text, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker'

export default () => {

  const [date, setDate] = useState(new Date())

  return (
      <View>
    <DatePicker
      date={date}
      onDateChange={setDate}
      mode='date'
    />

    <TouchableOpacity onPress = {console.log(date)}>
        <Text>Hello</Text>
    </TouchableOpacity>
    </View>
  )
}


// import React, {useState} from 'react';
// import { StyleSheet, FlatList, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
// import { Header, CheckBox } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default class CheckoutFinal extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             orderNow: false,
//             date: new Date(),
//         };

//     }



//     clearSchedule = () => {
//         this.setState({
//             orderNow: true
//         })
//         this.setState({
//             TextInput_ScheduleOrder: ''
//         })
//     }

//     clearOrder = (date) => {
//         this.setState({
//             TextInput_ScheduleOrder: date,
//             orderNow: false
//         })
//     }
//     render() {
//         const { date } = this.state;
//         const { goBack } = this.props.navigation;
//         return (
//             <View style={{ flex: 1, backgroundColor: 'white' }}>

//                 <Header
//                     containerStyle={{
//                         backgroundColor: 'white',
//                         justifyContent: 'space-around',
//                         borderBottomColor: '#EC1E24',
//                         borderBottomWidth: 1
//                     }}
//                     leftComponent={<TouchableOpacity onPress={() => goBack()}><Image style={{ height: 30, width: 30, tintColor: 'black', marginLeft: '10%', marginBottom: 15 }} source={require('../../images/cross.png')}></Image></TouchableOpacity>}
//                     centerComponent={{ text: 'Check out', style: { color: '#EC1E24', fontSize: 20, marginBottom: 15, fontFamily: 'Raleway-Bold' } }}
//                 />

//                 <View style={{ flexDirection: 'row', marginTop: '15%' }}>

//                     <Image style={{ height: 23, width: 23, marginLeft: '6.5%' }} source={require('../../images/firsttick.png')}></Image>

//                     <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginTop: '3%', marginHorizontal: '2%' }}></View>

//                     <Image style={{ height: 23, width: 23 }} source={require('../../images/firsttick.png')}></Image>

//                     <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginTop: '3%', marginHorizontal: '2%' }}></View>

//                     <Image style={{ height: 23, width: 23 }} source={require('../../images/firsttick.png')}></Image>

//                 </View>

//                 <DateTimePicker 
//         value={ date }
//         mode='datetime'
//         display='default'
//         onChange={ date => this.setState({ date }) } />
//                 {/* <DatePicker
//                     style={{ width: '91%', marginTop: '30%' }}
//                     date={this.state.TextInput_ScheduleOrder} //initial date from state
//                     mode="datetime" //The enum of date, datetime and time
//                     placeholder="Schedule Order"
//                     format="M-DD-YYYY hh:mm A"
//                     minDate="01-01-1950"
//                     maxDate="12-31-2020"
//                     confirmBtnText="Confirm"
//                     cancelBtnText="Cancel"
//                     iconSource={require('../../images/scheduleorder.png')}
//                     customStyles={{
//                         dateText: {
//                             color: '#707070',
//                             fontFamily: 'Raleway-Regular'

//                         },
//                         placeholderText: {
//                             color: '#707070',
//                             paddingRight: '12%',
//                             fontSize: 16,
//                             fontFamily: 'Raleway-Regular'
//                         },

//                         dateIcon: {
//                             position: 'absolute',
//                             left: 5,
//                             top: 22,
//                             marginLeft: '10%',
//                             height: 35,
//                             width: 35,
//                             resizeMode: 'contain'
//                         },
//                         dateInput: {
//                             marginLeft: 30,
//                             borderColor: 'white',
//                             borderRadius: 10,
//                             height: 70,
//                             marginTop: 40,
//                             backgroundColor: 'white',
//                             borderColor: '#A4A4A4',
//                             borderWidth: 1

//                         }
//                     }}
//                     onDateChange={(date) => this.clearOrder(date) }
//                 /> */}

//                 <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: '12%' }}>

//                     <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginHorizontal: '2%', marginVertical: 28 }}></View>

//                     <View>

//                         <Text style={{ fontSize: 15, fontFamily: 'Raleway-Bold', color: 'black', marginTop: '75%', }}> Or </Text>

//                     </View>

//                     <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginHorizontal: '2%', marginVertical: 28 }}></View>

//                 </View>

//                 <View style={{ height: 60, width: '83%', borderColor: '#A4A4A4', borderWidth: 1, marginHorizontal: '8.5%', backgroundColor: 'white', borderRadius: 10, marginTop: '2%' }}>

//                     <View style={{ flexDirection: 'row' }}>

//                         <Image style={{ height: 35, width: 35, marginTop: '4.5%', marginLeft: '6.5%' }} source={require('../../images/ordernow.png')} ></Image>

//                         <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular', color: '#707070', marginTop: '7.5%', marginLeft: '3%' }}>Order Now</Text>

//                         <CheckBox
//                             containerStyle={{
//                                 marginLeft: '35%',
//                                 marginTop: '3%',
//                             }}
//                             checkedColor='#EC1E24'
//                             checked={this.state.orderNow}
//                             onPress={() => this.clearSchedule()}
//                         />

//                     </View>

//                 </View>

//                 <TouchableOpacity style = {{height: 45, width: '75%', borderRadius: 10, alignSelf: 'center', backgroundColor: '#EC1E24', marginTop: '12%'}}>
//                             <Text style = {{fontSize: 15, fontFamily: 'Raleway-Bold', color: 'white', alignSelf: 'center', marginVertical: 12}}>Done</Text>
//                         </TouchableOpacity>




//             </View>
//         )
//     }
// }