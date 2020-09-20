import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
// import Video from 'react-native-video';

//  const { width } = Dimensions.get('window');
// const samplevideo = require('../../images/splashvideo.mp4');

export default class Splash extends React.Component {
  // constructor(p) {
  //   super(p);
  //   this.state = {
  //     currentTime: 0,
  //     duration: 0.1,
  //     paused: false,
  //     overlay: false,
  //     fullscreen: false
  //   };
  // }

  

  async sessionFN() {
    global.email = await AsyncStorage.getItem('id');
    global.password = await AsyncStorage.getItem('pass');
    global.user = await AsyncStorage.getItem('userid');

    console.log('email',global.email);

    console.log('password',global.password);

    console.log('password',global.user);

    // global.iddd=await AsyncStorage.getItem('userid');

    //this.props.navigation.goBack();
    // Alert.alert('your session id : '+ global.password);
  }

componentDidMount(){
  this.sessionFN();
  
  setTimeout(
    function() {
       
       this.getuserid();
    }
    .bind(this),
    500
  );
 
 
   
}

getuserid() {
  fetch(global.address + 'fetchuserid', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userCellNo: global.email,
      userPassword: global.password,
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


  render = () => {
    // const { currentTime, duration, paused, overlay, fullscreen } = this.state;
    setTimeout(()=>{
      // this.props.navigation.navigate('MainSacreen');
      this.props.navigation.replace("Drawer"); 
  },5000);
    return (
      <View style={style.container}>


        <Image source = {require('../../images/logo.jpg')} resizeMode = 'contain'
                style = {{height: '50%', width: '100%'}} />
          {/* <Video
            fullscreen={fullscreen}
            paused={paused} // this will manage the pause and play
            ref={ref => this.video = ref}
            source={samplevideo}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            onLoad={this.load}
            onProgress={this.progress}
            muted={false}
          // onVideoEnd={this.onEndVideo}
          /> */}
 
        </View>
    
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject
  // },
  // overlaySet: {
  //   flex: 1,
  //   flexDirection: 'row'
  // },
  // icon: {
  //   color: 'white',
  //   flex: 1,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  //   fontSize: 25
  // },
  // sliderCont: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0
  // },
  // timer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 5
  // },
  // video: { width, height: width * .6, backgroundColor: 'black' },
  // fullscreenVideo: {
  //   backgroundColor: 'black',
  //   ...StyleSheet.absoluteFill,
  //   elevation: 1
  // }
});