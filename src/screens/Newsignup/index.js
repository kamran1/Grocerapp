import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var hobbies = [
  {label: 'Female', value: 'Female'},
  {label: 'Male', value: 'Male'},
  {label: 'Custom', value: 'Custom'},
];

global.email = '';
global.userid = '';
global.password = '';
global.iddd = '';
global.userName = '';
export default class Newsignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_Day: '',
      TextInput_Month: '',
      TextInput_Year: '',
      firstName: '',
      lastName: '',
      phoneNumnber: '',
      email: '',
      password: '',
      renter_password: '',
      gender: '',
      currentUserID: '',
      indicator: false,
    };
  }

  validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  checkSignUp = () => {
    this.setState({
      indicator: true,
    });
    if (this.state.firstName == '') {
      this.setState({
        indicator: false,
      });
      alert('Please Enter First Name');
    }
    // else if (this.validateEmail(this.state.email) == false) {
    //   alert('Please Enter Valid Email\nE.g:name@example.com')
    //   // alert(this.validateEmail(this.state.email));
    // }
    else if (this.state.lastName == '') {
      this.setState({
        indicator: false,
      });
      alert('Please Enter Last Name');
    } else if (this.state.phoneNumnber == '') {
      this.setState({
        indicator: false,
      });
      alert('Please Enter Phone Number');
    } else if (this.state.password == '') {
      this.setState({
        indicator: false,
      });
      alert('Please Enter Password');
    }
    // else if (this.state.TextInput_Day == '') {
    //   alert('Please Enter DOB')
    // }
    else if (this.state.gender == '') {
      this.setState({
        indicator: false,
      });
      alert('Please Select Gender');
    } else if (this.state.password != this.state.renter_password) {
      this.setState({
        indicator: false,
      });
      alert('Please Enter Same Password');
    } else {
      this.setState({
        indicator: true,
      });
      this.signup();
    }
  };

  signup() {
    //console.log('Zaka1234567.....')
    // if (this.state.email == '') {
    //   alert('Please Enter Email')
    // } else

    // //////////////////////////////////////////////////

    fetch(global.address + 'checkEmailExt', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userCellNo: this.state.phoneNumnber,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'ok') {
          // this.props.navigation.navigate('Drawer');
          // alert('ok')
          // //////////////////////////////////////

          setTimeout(
            function () {
              var dateCont =
                this.state.TextInput_Day +
                '-' +
                this.state.TextInput_Month +
                '-' +
                this.state.TextInput_Year;
              //this.props.navigation.replace('Newsignin'),
              fetch(global.address + 'insertIntoUsers456', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userFirstName: this.state.firstName,
                  userLastName: this.state.lastName,
                  userEmail: this.state.email,
                  userPassword: this.state.password,
                  userCellNo: this.state.phoneNumnber,
                  userGender: this.state.gender,
                  userBirthday: dateCont,
                  userStatus: 'Active',
                }),
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  this.getuserid();
                  // console.log('Sigup....')
                  // console.log(responseJson);
                })
                .catch((error) => {
                  //  Alert.alert('Error', error.message)
                });
            }.bind(this),
            500,
          );

          //   // XXXXXXXXXXXXXXXXXEnd Json Respone of insertXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        } else {
          this.setState({
            indicator: false,
          });

          alert('Phone No Already Exist');
        }

        // this.setState({
        //   shops : responseJson,
        // });
        // console.log('This working Well');
        // console.log("Shops ..........")
        //    console.log(responseJson);
      })
      .catch((error) => {
        //  Alert.alert('Error', error.message)
      });

    // ///////xXXXXXXXXXXXXXXXXXXX///////////////////////////////////////////
  }

  async getuserid() {
    await fetch(global.address + 'fetchuserid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userCellNo: this.state.phoneNumnber,
        userPassword: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // global.userid = Object.values(responseJson[0]);
        global.userid = responseJson[0].userId;
        global.userName =
          responseJson[0].userFirstName + responseJson[0].userLastName;

        this.setState({
          currentUserID: global.userid,
        });

        AsyncStorage.setItem('id', this.state.phoneNumnber);
        AsyncStorage.setItem('pass', this.state.password);
        AsyncStorage.setItem('userid', this.state.currentUserID);
        this.props.navigation.navigate('First');
        // Alert.alert(""+global.userid)
        //console.log(global.userid)
        // Alert.alert('Successfully Login!...');

        this.sessionFN();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });

    //Alert.alert('runninig')
  }

  async sessionFN() {
    global.email = await AsyncStorage.getItem('id');
    global.password = await AsyncStorage.getItem('pass');
    // global.iddd=await AsyncStorage.getItem('userid');

    //this.props.navigation.goBack();
    // Alert.alert('your session id : '+ global.password);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.indicator == true ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                        <ActivityIndicator size="large" color="#0000ff" />
                        <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View>
            <ScrollView>
              <Text
                style={{
                  color: 'black',
                  marginHorizontal: '7%',
                  fontSize: 30,
                  marginTop: '5%',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Sign Up
              </Text>

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholder="First Name"
                  style={{
                    borderRadius: 2,
                    fontSize: 15,
                    marginTop: '2%',
                    color: 'black',
                    marginLeft: '7%',
                    fontFamily: 'Montserrat-Medium',
                    paddingLeft: '3%',
                    borderColor: '#A4A4A4',
                    borderWidth: 2,
                    width: '40%',
                  }}
                  placeholderTextColor={'black'}
                  onChangeText={(TextInputValue) =>
                    this.setState({firstName: TextInputValue})
                  }
                />

                <TextInput
                  placeholder="Last Name"
                  style={{
                    borderRadius: 2,
                    fontSize: 15,
                    marginTop: '2%',
                    color: 'black',
                    marginLeft: '1%',
                    fontFamily: 'Montserrat-Medium',
                    paddingLeft: '3%',
                    borderColor: '#A4A4A4',
                    borderWidth: 2,
                    width: '40%',
                  }}
                  placeholderTextColor={'black'}
                  onChangeText={(TextInputValue) =>
                    this.setState({lastName: TextInputValue})
                  }
                />
              </View>

              <TextInput
                placeholder="Phone"
                style={{
                  borderRadius: 2,
                  marginTop: '2%',
                  fontSize: 15,
                  color: 'black',
                  marginLeft: '7%',
                  fontFamily: 'Montserrat-Medium',
                  paddingLeft: '3%',
                  borderColor: '#A4A4A4',
                  borderWidth: 2,
                  width: '85%',
                }}
                placeholderTextColor={'black'}
                keyboardType="number-pad"
                onChangeText={(TextInputValue) =>
                  this.setState({phoneNumnber: TextInputValue})
                }
              />

              <TextInput
                placeholder="Email (Optional)"
                style={{
                  borderRadius: 2,
                  marginTop: '2%',
                  fontSize: 15,
                  color: 'black',
                  marginLeft: '7%',
                  fontFamily: 'Montserrat-Medium',
                  paddingLeft: '3%',
                  borderColor: '#A4A4A4',
                  borderWidth: 2,
                  width: '85%',
                }}
                placeholderTextColor={'black'}
                onChangeText={(TextInputValue) =>
                  this.setState({email: TextInputValue})
                }
              />

              <TextInput
                placeholder="Password"
                style={{
                  borderRadius: 2,
                  marginTop: '2%',
                  fontSize: 15,
                  color: 'black',
                  marginLeft: '7%',
                  fontFamily: 'Montserrat-Medium',
                  paddingLeft: '3%',
                  borderColor: '#A4A4A4',
                  borderWidth: 2,
                  width: '85%',
                }}
                placeholderTextColor={'black'}
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({renter_password: TextInputValue})
                }
              />

              <TextInput
                placeholder="Re-enter Password"
                style={{
                  borderRadius: 2,
                  marginTop: '2%',
                  fontSize: 15,
                  color: 'black',
                  marginLeft: '7%',
                  fontFamily: 'Montserrat-Medium',
                  paddingLeft: '3%',
                  borderColor: '#A4A4A4',
                  borderWidth: 2,
                  width: '85%',
                }}
                placeholderTextColor={'black'}
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({password: TextInputValue})
                }
              />

              <Text
                style={{
                  color: 'black',
                  marginHorizontal: '7%',
                  fontSize: 18,
                  marginTop: '5%',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Birthday (Optinal)
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 55,
                    width: '24%',
                    marginTop: 10,
                    marginLeft: '7.5%',
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: '#A4A4A4',
                  }}>
                  <Picker
                    mode="dropdown"
                    style={{color: 'black'}}
                    selectedValue={this.state.TextInput_Day}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({TextInput_Day: itemValue})
                    }>
                    <Picker.Item label="01" value="01" />
                    <Picker.Item label="02" value="02" />
                    <Picker.Item label="03" value="03" />
                    <Picker.Item label="04" value="04" />
                    <Picker.Item label="05" value="05" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="07" value="07" />
                    <Picker.Item label="08" value="08" />
                    <Picker.Item label="09" value="09" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="24" value="24" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="26" value="26" />
                    <Picker.Item label="27" value="27" />
                    <Picker.Item label="28" value="28" />
                    <Picker.Item label="29" value="29" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="31" value="31" />
                  </Picker>
                </View>

                <View
                  style={{
                    height: 55,
                    width: '27%',
                    marginTop: 10,
                    marginHorizontal: '2%',
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: '#A4A4A4',
                  }}>
                  <Picker
                    mode="dropdown"
                    style={{color: 'black'}}
                    selectedValue={this.state.TextInput_Month}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({TextInput_Month: itemValue})
                    }>
                    <Picker.Item label="Jan" value="Jan" />
                    <Picker.Item label="Feb" value="Feb" />
                    <Picker.Item label="Mar" value="Mar" />
                    <Picker.Item label="Apr" value="Apr" />
                    <Picker.Item label="May" value="May" />
                    <Picker.Item label="Jun" value="Jun" />
                    <Picker.Item label="Jul" value="Jul" />
                    <Picker.Item label="Aug" value="Aug" />
                    <Picker.Item label="Sep" value="Sep" />
                    <Picker.Item label="Oct" value="Oct" />
                    <Picker.Item label="Nov" value="Nov" />
                    <Picker.Item label="Dec" value="Dec" />
                  </Picker>
                </View>

                <View
                  style={{
                    height: 55,
                    width: '30%',
                    marginTop: 10,
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: '#A4A4A4',
                  }}>
                  <Picker
                    mode="dropdown"
                    style={{color: 'black'}}
                    selectedValue={this.state.TextInput_Year}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({TextInput_Year: itemValue})
                    }>
                    <Picker.Item label="1950" value="1950" />
                    <Picker.Item label="1951" value="1951" />
                    <Picker.Item label="1952" value="1952" />
                    <Picker.Item label="1953" value="1953" />
                    <Picker.Item label="1954" value="1954" />
                    <Picker.Item label="1955" value="1955" />
                    <Picker.Item label="1956" value="1956" />
                    <Picker.Item label="1957" value="1957" />
                    <Picker.Item label="1958" value="1958" />
                    <Picker.Item label="1959" value="1959" />
                    <Picker.Item label="1960" value="1960" />
                    <Picker.Item label="1961" value="1961" />
                    <Picker.Item label="1962" value="1962" />
                    <Picker.Item label="1963" value="1963" />
                    <Picker.Item label="1964" value="1964" />
                    <Picker.Item label="1965" value="1965" />
                    <Picker.Item label="1966" value="1966" />
                    <Picker.Item label="1967" value="1967" />
                    <Picker.Item label="1968" value="1968" />
                    <Picker.Item label="1969" value="1969" />
                    <Picker.Item label="1970" value="1970" />
                    <Picker.Item label="1971" value="1971" />
                    <Picker.Item label="1972" value="1972" />
                    <Picker.Item label="1973" value="1973" />
                    <Picker.Item label="1974" value="1974" />
                    <Picker.Item label="1975" value="1975" />
                    <Picker.Item label="1976" value="1976" />
                    <Picker.Item label="1977" value="1977" />
                    <Picker.Item label="1978" value="1978" />
                    <Picker.Item label="1979" value="1979" />
                    <Picker.Item label="1980" value="1980" />
                    <Picker.Item label="1981" value="1981" />
                    <Picker.Item label="1982" value="1982" />
                    <Picker.Item label="1983" value="1983" />
                    <Picker.Item label="1984" value="1984" />
                    <Picker.Item label="1985" value="1985" />
                    <Picker.Item label="1986" value="1986" />
                    <Picker.Item label="1987" value="1987" />
                    <Picker.Item label="1988" value="1988" />
                    <Picker.Item label="1989" value="1989" />
                    <Picker.Item label="1990" value="1990" />
                    <Picker.Item label="1991" value="1991" />
                    <Picker.Item label="1992" value="1992" />
                    <Picker.Item label="1993" value="1993" />
                    <Picker.Item label="1994" value="1994" />
                    <Picker.Item label="1995" value="1995" />
                    <Picker.Item label="1996" value="1996" />
                    <Picker.Item label="1997" value="1997" />
                    <Picker.Item label="1998" value="1998" />
                    <Picker.Item label="1999" value="1999" />
                    <Picker.Item label="2000" value="2000" />
                    <Picker.Item label="2001" value="2001" />
                    <Picker.Item label="2002" value="2002" />
                    <Picker.Item label="2003" value="2003" />
                    <Picker.Item label="2004" value="2004" />
                    <Picker.Item label="2005" value="2005" />
                    <Picker.Item label="2006" value="2006" />
                    <Picker.Item label="2007" value="2007" />
                    <Picker.Item label="2008" value="2008" />
                    <Picker.Item label="2009" value="2009" />
                    <Picker.Item label="2010" value="2010" />
                    <Picker.Item label="2011" value="2011" />
                    <Picker.Item label="2012" value="2012" />
                    <Picker.Item label="2013" value="2013" />
                    <Picker.Item label="2014" value="2014" />
                    <Picker.Item label="2015" value="2015" />
                    <Picker.Item label="2016" value="2016" />
                    <Picker.Item label="2017" value="2017" />
                    <Picker.Item label="2018" value="2018" />
                    <Picker.Item label="2019" value="2019" />
                    <Picker.Item label="2020" value="2020" />
                  </Picker>
                </View>
              </View>

              <Text
                style={{
                  color: 'black',
                  marginHorizontal: '7%',
                  fontSize: 18,
                  marginTop: '5%',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Gender
              </Text>

              <RadioForm
                style={{marginLeft: '7.5%', marginTop: '2%'}}
                radio_props={hobbies}
                initial={3}
                // onPress={(value) => { ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                onPress={(value) => this.setState({gender: value})}
                buttonSize={20}
                buttonColor="black"
                buttonOuterSize={20}
                selectedButtonColor={'black'}
                selectedLabelColor={'black'}
                labelColor={'black'}
                labelStyle={{fontSize: 17, paddingRight: 15}}
                disabled={false}
                formHorizontal={true}
                onChangeText={(TextInputValue) =>
                  this.setState({gender: TextInputValue})
                }
              />

              <Text
                style={{
                  fontSize: 11,
                  marginTop: '8%',
                  fontFamily: 'Montserrat-Light',
                  alignSelf: 'center',
                  color: '#A4A4A4',
                  alignSelf: 'center',
                }}>
                By clicking Sign Up, you agree to our{' '}
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: '5%',
                    color: '#0061C7',
                    fontFamily: 'Montserrat-Light',
                  }}>
                  Terms, Data Policy{' '}
                  <Text
                    style={{
                      fontSize: 11,
                      alignSelf: 'center',
                      marginTop: '5%',
                      fontFamily: 'Montserrat-Light',
                      color: '#A4A4A4',
                    }}>
                    and
                  </Text>
                </Text>
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Montserrat-Light',
                  color: '#0061C7',
                  alignSelf: 'center',
                }}>
                Cookie Policy
                <Text
                  style={{
                    fontSize: 11,
                    alignSelf: 'center',
                    fontFamily: 'Montserrat-Light',
                    color: '#A4A4A4',
                  }}>
                  . You may receive SMS notifications from us and
                </Text>
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Montserrat-Light',
                  color: '#A4A4A4',
                  alignSelf: 'center',
                }}>
                can opt out at any time.
              </Text>
              {/* () => this.props.navigation.navigate('Newsignin'), */}

              <TouchableOpacity
                onPress={this.checkSignUp}
                style={{
                  height: 55,
                  width: '85%',
                  backgroundColor: '#EC1E24',
                  marginTop: '14%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Montserrat-Medium',
                    color: 'white',
                    marginVertical: 8,
                    alignSelf: 'center',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Newsignin')}
                style={{marginTop: '2%', alignSelf: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-Medium',
                    color: 'red',
                    marginVertical: 8,
                    alignSelf: 'center',
                  }}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: {
    width: '23%',
    marginLeft: '100%',
  },
  pickerItem: {
    color: 'red',
  },
});

// import React, { Component } from 'react';
// import { Text, View, StyleSheet, Picker } from 'react-native';

// export default class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       language: 'haxe',
//       firstLanguage: 'java',
//       secondLanguage: 'js',
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Unstyled:</Text>
//         <Picker
//           style={styles.picker} itemStyle={styles.pickerItem}
//           selectedValue={this.state.language}
//           onValueChange={(itemValue) => this.setState({language: itemValue})}
//         >
//           <Picker.Item label="Java" value="java" />
//           <Picker.Item label="JavaScript" value="js" />
//           <Picker.Item label="Python" value="python" />
//           <Picker.Item label="Haxe" value="haxe" />
//         </Picker>

//         <Text style={styles.title}>Shows one row:</Text>
//         <Picker
//           style={styles.onePicker} itemStyle={styles.onePickerItem}
//           selectedValue={this.state.firstLanguage}
//           onValueChange={(itemValue) => this.setState({firstLanguage: itemValue})}
//         >
//           <Picker.Item label="Java" value="java" />
//           <Picker.Item label="JavaScript" value="js" />
//           <Picker.Item label="Python" value="python" />
//           <Picker.Item label="Haxe" value="haxe" />
//         </Picker>

//         <Text style={styles.title}>Shows above and below values:</Text>
//         <Picker
//           style={styles.twoPickers} itemStyle={styles.twoPickerItems}
//           selectedValue={this.state.secondLanguage}
//           onValueChange={(itemValue) => this.setState({secondLanguage: itemValue})}
//         >
//           <Picker.Item label="Java" value="java" />
//           <Picker.Item label="JavaScript" value="js" />
//           <Picker.Item label="Python" value="python" />
//           <Picker.Item label="Haxe" value="haxe" />
//         </Picker>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   picker: {
//     width: '30%',
//     borderColor: 'red',
//     borderWidth: 1,
//     borderRadius: 2
//   },
//   pickerItem: {
//     color: 'red'
//   },
//   onePicker: {
//     width: 200,
//     height: 44,
//     backgroundColor: '#FFF0E0',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   onePickerItem: {
//     height: 44,
//     color: 'red'
//   },
//   twoPickers: {
//     width: 200,
//     height: 88,
//     backgroundColor: '#FFF0E0',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   twoPickerItems: {
//     height: 88,
//     color: 'red'
//   },
// });
