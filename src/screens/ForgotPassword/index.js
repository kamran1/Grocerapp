import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, Alert,
  View, Button, Modal, ImageBackground, ScrollView, Image} from 'react-native';  
  
export default class App extends Component {  
  state = {  
    ModalVisible: false, 
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});

  }
  render() {  
    return (  
      <View style = {styles.container}>  
        <Modal            
          animationType = {"fade"}  
          
          transparent = {false}  
          visible = {this.state.modalVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          <ScrollView>
        

              <View style = {styles.modal}>
              <TouchableOpacity style={styles.modalimg_res}
              
               onPress={()=> {this.setModalVisible(!this.state.modalVisible);}}>
                <Image style={styles.modal_img} source={require('../../images/cross1.png')}></Image>
                </TouchableOpacity>  
              <Text style = {styles.text}>FORGOT PASSWORD</Text> 

              <View style={{height:200, width:"70%", marginBottom:190}}>

              <ImageBackground source={require('../../images/Group_1495.png')}
              style={{height:170, width:100, marginBottom:0, alignSelf:'center'}}></ImageBackground>

              <Text style={{fontWeight:'bold', width:250, marginLeft:25, marginTop:10,
               alignSelf:'center', color:'#707070'}}>Enter The registered Mobile Number</Text>

              <Text style={{width:220, marginTop:10, marginLeft:20,
               alignSelf:'center', textAlign:'center', color:'#d4d4d4'}}>
                 We Will send you OTP Verification to reset your Password</Text>

              <Text style={{marginTop:15, color:'#454545', width:250, 
                marginRight:10, alignSelf:'center', fontWeight:'bold', fontSize:18}}>Mobile Number</Text>

    <TextInput style={styles.input}
          placeholderTextColor='white' keyboardType = 'numeric'>
            
          </TextInput>
          <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.props.navigation.navigate('otp')}}
            >
          <Text style={{alignSelf:'center', height:32, fontWeight:'bold',
           color:'white', marginTop:2}}>SEND</Text>
            </TouchableOpacity>
    </View>
    
              </View> 
              </ScrollView> 
            </Modal>  
            
            {/*Button will change state to true and view will re-render*/}  
            
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    backgroundColor: 'red',  
  },  
  modal: {  
  justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : "#ffffff",   
  height: 480 ,  
  width: '85%',  
  borderRadius:0,  
  borderWidth: 1,  
  borderColor: '#ffffff',    
  marginTop: 70,  
  marginLeft: 30,  
   
   },  
   text: {  
      color: '#535353',  
      marginBottom:30,
      fontSize:25,
      fontWeight:'600'
   },
   button: {
     marginTop:15,
     alignSelf:'center',
    alignItems: 'center',
    backgroundColor: '#ec1e24',
    padding: 5,
    width:280,
    marginRight:10,
    height:80
  },
   input:{
    marginTop:5,
    borderWidth:3,
    alignSelf:'center',
    borderColor: "#fce2e3",
    padding: 10,
    marginRight:9,
    width:280,
    fontSize:13
    
  },
  modalimg_res:{
    alignSelf:'flex-end',
    marginTop:-24
  },
  modal_img:{
    height:40,
    width:40,

  },
});  