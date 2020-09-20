import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
  AsyncStorage,
  Button,
  Alert,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

global.email = '';
global.userid = '';
global.password = '';
global.iddd = '';
global.userName = '';
export default class NewLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      hidePassword: true,
      isVisible: false,
      isVisible1: false,
      email: '',
      password: '',
      currentUserID: '',
      indigat: false,
      cellNo: '',
    };
  }

  componentDidMount() {
    this.sessionFN();
  }

  validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  login = () => {
    if (this.state.cellNo == '') {
      Alert.alert('Please enter your phone');
    } else if (this.state.password == '') {
      Alert.alert('Please enter your password');
    } else {
      this.setState({
        indigat: true,
      });
      fetch(global.address + 'loginUser123', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userCellNo: this.state.cellNo,
          userPassword: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          let res = responseJson;
          this.checkResponse(res);
          // if (responseJson === 'ok') {
          //     this.getuserid()

          //     //   alert('ok')
          // } else {
          //     alert('Please Enter Correct Email And Password')
          //     this.setState({
          //         indigat: false,
          //     })
          // }
        })
        .catch((error) => {
          //Alert.alert('Error', error.message)
        });
    }
  };

  checkResponse(res) {
    if (res == 'ok') {
      this.getuserid();

      //   alert('ok')
    } else {
      Alert.alert('Please Enter Correct Email And Password');
      this.setState({
        indigat: false,
      });
    }
  }

  getuserid() {
    fetch(global.address + 'fetchuserid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userCellNo: this.state.cellNo,
        userPassword: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        global.userid = responseJson[0].userId;
        global.userName =
          responseJson[0].userFirstName + responseJson[0].userLastName;

        this.setState({
          currentUserID: global.userid,
        });

            this.sessionFunSet();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  sessionFunSet(){
    AsyncStorage.setItem('id', this.state.cellNo);
    AsyncStorage.setItem('pass', this.state.password);
    AsyncStorage.setItem('userid', this.state.currentUserID);
    this.props.navigation.navigate('First');
    //  Alert.alert(""+global.userid)
    // console.log(global.userid)
    //Alert.alert('Successfully Login!');

    this.sessionFN();
  }

  async sessionFN() {
    global.email = await AsyncStorage.getItem('id');
    global.password = await AsyncStorage.getItem('pass');
    // global.iddd=await AsyncStorage.getItem('userid');

    //this.props.navigation.goBack();
    // Alert.alert('your session id : '+ global.password);
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.indigat == true ? (
          <View style={[styles.container1, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                        <ActivityIndicator size="large" color="#0000ff" />
                        <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View style={styles.container}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isVisible}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              {/*All views of Modal*/}

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.modal}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 25,
                        marginTop: '2%',
                        fontFamily: 'BebasNeue-Bold',
                        marginLeft: '10%',
                        color: 'black',
                      }}>
                      FORGOT PASSWORD
                    </Text>

                    <TouchableOpacity
                      style={{marginTop: '-5%', marginLeft: '3%'}}
                      onPress={() => {
                        this.setState({isVisible: !this.state.isVisible});
                      }}>
                      <Image
                        source={require('../../images/cross1.png')}
                        resizeMode="contain"
                        style={{height: 30, width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require('../../images/forgotpassword.png')}
                    resizeMode="contain"
                    style={{
                      height: 130,
                      width: 130,
                      alignSelf: 'center',
                      marginTop: '10%',
                    }}></Image>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Montserrat-Light',
                      color: '#707070',
                      alignSelf: 'center',
                      marginTop: '12%',
                    }}>
                    Enter the registered Mobile Number
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Montserrat-Light',
                      color: '#707070',
                      alignSelf: 'center',
                      marginTop: '6%',
                    }}>
                    We will send you a OTP Verification
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Montserrat-Light',
                      color: '#707070',
                      alignSelf: 'center',
                    }}>
                    to reset your password
                  </Text>

                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: '9%',
                      fontFamily: 'Montserrat-Medium',
                      color: 'black',
                      marginTop: '5%',
                    }}>
                    Mobile Number
                  </Text>

                  <TextInput
                    keyboardType="phone-pad"
                    style={{
                      height: 55,
                      fontSize: 17,
                      paddingLeft: '3%',
                      color: 'black',
                      width: '85%',
                      marginTop: '2%',
                      alignSelf: 'center',
                      borderColor: '#EC1E24',
                      borderWidth: 1,
                      borderRadius: 1,
                    }}></TextInput>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isVisible1: true, isVisible: false});
                    }}
                    style={{
                      height: 55,
                      marginTop: '10%',
                      width: '90%',
                      alignSelf: 'center',
                      backgroundColor: '#EC1E24',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Montserrat-Medium',
                        color: 'white',
                        alignSelf: 'center',
                        marginVertical: 12,
                      }}>
                      SEND
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title="Click To Close Modal" onPress={() => {
                            this.setState({ isVisible: !this.state.isVisible })
                        }} /> */}
                </View>
              </View>
            </Modal>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible1}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              {/*All views of Modal*/}

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.modal1}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 25,
                        marginTop: '2%',
                        fontFamily: 'BebasNeue-Bold',
                        marginLeft: '10%',
                        color: 'black',
                      }}>
                      FORGOT PASSWORD
                    </Text>

                    <TouchableOpacity
                      style={{marginTop: '-5%', marginLeft: '3%'}}
                      onPress={() => {
                        this.setState({isVisible1: !this.state.isVisible1});
                      }}>
                      <Image
                        source={require('../../images/cross1.png')}
                        resizeMode="contain"
                        style={{height: 30, width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require('../../images/forgotpassword.png')}
                    resizeMode="contain"
                    style={{
                      height: 130,
                      width: 130,
                      alignSelf: 'center',
                      marginTop: '10%',
                    }}></Image>

                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 18,
                      fontFamily: 'Montserrat-SemiBold',
                      alignSelf: 'center',
                    }}>
                    OTP VERIFICATION
                  </Text>

                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 16,
                      fontFamily: 'Montserrat-Light',
                      alignSelf: 'center',
                    }}>
                    Enter the OTP sent to +92 301 1234567
                  </Text>

                  <View
                    style={{
                      height: 50,
                      width: '15%',
                      marginLeft: '22%',
                      marginTop: 10,
                    }}>
                    <OtpInputs
                      handleChange={(code) => console.log(code)}
                      numberOfInputs={4}
                      inputContainerStyles={{
                        borderColor: '#A4A4A4',
                        borderWidth: 1,
                        height: 40,
                        borderRadius: 10,
                        paddingLeft: 10,
                        marginRight: '15%',
                      }}
                      inputsContainerStyles={{
                        marginLeft: '-5%',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{fontSize: 12, fontFamily: 'Montserrat-Light'}}>
                      Didn't received the OTP?{' '}
                    </Text>

                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Montserrat-SemiBold',
                          color: 'black',
                          textDecorationLine: 'underline',
                        }}>
                        Resend OTP
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isVisible1: true, isVisible: false});
                    }}
                    style={{
                      height: 55,
                      marginTop: '10%',
                      width: '90%',
                      alignSelf: 'center',
                      backgroundColor: '#EC1E24',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Montserrat-Medium',
                        color: 'white',
                        alignSelf: 'center',
                        marginVertical: 12,
                      }}>
                      SEND
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title="Click To Close Modal" onPress={() => {
                            this.setState({ isVisible: !this.state.isVisible })
                        }} /> */}
                </View>
              </View>
            </Modal>

            <ScrollView>
              {/* <Text style={{ fontSize: 30, color: 'black', marginTop: '25%', fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>
                        Sign In
                </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Newsignup')}>
                        <Text style={{ fontSize: 17, marginBottom: '10%', fontFamily: 'Montserrat-Regular', color: 'black', alignSelf: 'center' }}>
                            New to GoBig? <Text style={{ fontSize: 17, fontFamily: 'Montserrat-Regular', color: '#EC1E24', alignSelf: 'center' }}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 55, borderRadius: 4, width: '85%', marginHorizontal: '7.5%', backgroundColor: '#EC1E24' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, marginTop: '5%', marginLeft: '8%', fontFamily: 'OpenSans-SemiBold', color: 'white' }}>
                                Sign in with Facebook
                    </Text>

                            <Image source={require('../../images/fb.png')} style={{ marginLeft: '28%', height: '60%', width: '4%', marginTop: '6%' }}></Image>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 55, marginVertical: '4%', borderRadius: 4, width: '85%', marginHorizontal: '7.5%', backgroundColor: '#EC1E24' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, marginTop: '5%', marginLeft: '8%', fontFamily: 'OpenSans-SemiBold', color: 'white' }}>
                                Sign in with Google
                    </Text>

                            <Image source={require('../../images/google.png')} style={{ marginLeft: '33%', height: '60%', width: '8%', marginTop: '6%' }}></Image>
                        </View>

                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ height: '4%', width: '27.5%', backgroundColor: '#A4A4A4', marginLeft: '7.5%', marginTop: '3%' }}></View>
                        <Text style={{ fontSize: 15, color: '#A4A4A4', fontFamily: 'Montserrat-Light' }}> or with email </Text>
                        <View style={{ height: '4%', width: '27%', backgroundColor: '#A4A4A4', marginTop: '3%' }}></View>
                    </View> */}

              <Image
                source={require('../../images/phataphat.jpeg')}
                resizeMode="contain"
                style={{
                  height: 150,
                  width: '55%',
                  alignSelf: 'center',
                  marginTop: '10%',
                  borderRadius: 50,
                }}></Image>

              <Text
                style={{
                  fontSize: 20,
                  marginTop: '5%',
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  marginLeft: '7.5%',
                }}>
                Phone
              </Text>

              <TextInput
                style={{
                  height: 55,
                  fontSize: 17,
                  paddingLeft: '3%',
                  color: 'black',
                  width: '85%',
                  marginTop: '2%',
                  marginHorizontal: '7.5%',
                  borderColor: '#A4A4A4',
                  borderWidth: 2,
                  borderRadius: 2,
                }}
                onChangeText={(TextInputValue) =>
                  this.setState({cellNo: TextInputValue})
                }
              />

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: '5%',
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    marginLeft: '7.5%',
                  }}>
                  Password
                </Text>

                {/* <TouchableOpacity onPress = {() => {this.setState({ isVisible: true})}}>
                            <Text style={{ fontSize: 13, marginLeft: '24.5%', color: '#A4A4A4', marginTop: '10%', fontFamily: 'Montserrat-Light', textDecorationLine: 'underline' }}>Forgot your Password?</Text>
                        </TouchableOpacity> */}
              </View>
              <View style={styles.textBoxContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  secureTextEntry={this.state.hidePassword}
                  style={styles.textBox}
                  onChangeText={(TextInputValue) =>
                    this.setState({password: TextInputValue})
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.touachableButton}
                  onPress={this.setPasswordVisibility}>
                  <Image
                    source={
                      this.state.hidePassword
                        ? require('../../images/hidepassword.png')
                        : require('../../images/showpassword.png')
                    }
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={this.login}
                style={{
                  height: 55,
                  marginTop: '10%',
                  width: '85%',
                  marginHorizontal: '7.5%',
                  backgroundColor: '#EC1E24',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Medium',
                    color: 'white',
                    alignSelf: 'center',
                    marginVertical: 12,
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginTop: '10%'}}
                onPress={() => this.props.navigation.navigate('Newsignup')}>
                <Text
                  style={{
                    fontSize: 17,
                    marginBottom: '10%',
                    fontFamily: 'Montserrat-Regular',
                    color: 'black',
                    alignSelf: 'center',
                  }}>
                  New ?{' '}
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'Montserrat-Regular',
                      color: '#EC1E24',
                      alignSelf: 'center',
                    }}>
                    Sign Up
                  </Text>
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

  headerText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textBox: {
    fontSize: 17,
    width: '85%',
    marginHorizontal: '7.5%',
    alignSelf: 'stretch',
    height: 55,
    paddingLeft: 8,
    borderWidth: 2,
    borderRadius: 2,
    paddingVertical: 0,
    borderColor: '#A4A4A4',
    color: 'black',
    paddingLeft: '3%',
  },
  touachableButton: {
    position: 'absolute',
    right: '10%',
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    tintColor: '#A4A4A4',
  },
  modal: {
    backgroundColor: 'white',
    height: 550,
    width: '80%',
  },
  modal1: {
    backgroundColor: 'white',
    height: 460,
    width: '80%',
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  container1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
