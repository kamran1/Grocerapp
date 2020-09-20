import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {DrawerActions} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from '../Menu';
import ProductList from '../ProductList';
import Cart from '../Cart';
import Checkout from '../Checkout';
import OrderCompletion from '../OrderCompletion';
import Myorder from '../Myorder';
import ContactUs from '../ContactUs/index.js';
import GasSubmission from '../GasSubmission';
import RentACar from '../RentACar';

//var nameUser =  global.userName;

class NavigationDrawerStructure extends React.Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Icon
            name="ios-menu"
            size={32}
            style={{color: 'red', marginHorizontal: 10}}
          />
          {/* <Image
            source={require('./assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

class Custom_Side_Menu extends React.Component {
  logOutFN() {
    (global.userid = ''), (global.userName = ''), AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('pass');
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    //Alert.alert('Logout Successfully!')
    this.props.navigation.navigate('First');
  }

  myOrderSettingFN() {
    if (global.userid == '') {
      Alert.alert('Please Login!');
      this.props.navigation.navigate('Newsignin');
    } else {
      this.props.navigation.navigate('Six');
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity>
          <View
            style={{marginTop: '10%', marginLeft: '5%', flexDirection: 'row'}}>
            <Image
              style={{height: 70, width: 70, borderRadius: 50}}
              source={require('../../images/profile-2.png')}
              resizeMode="contain"
            />

            <View style={{flexDirection: 'column'}}>
              <View style={{width: Dimensions.get('window').width - 170}}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    marginLeft: '4%',
                    marginTop: '5%',
                    flexWrap: 'wrap-reverse',
                  }}>
                  {global.userName}
                </Text>
                <Text style={{fontSize: 17, color: 'gray', marginLeft: '4%'}}>
                  Profile
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 0.5,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'gray',
            marginTop: '15%',
          }}></View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('First')}>
          <View
            style={{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>
            <Icon name="ios-home" size={22} style={{color: 'red'}} />
            <Text style={{fontSize: 17, color: 'gray', marginLeft: '3%'}}>
              Home
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.myOrderSettingFN()}>
          <View
            style={{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>
            <Image
              resizeMode="contain"
              source={require('../../images/my-order.png')}
              style={{height: 20, width: 20, tintColor: 'red'}}></Image>
            <Text style={{fontSize: 17, color: 'gray', marginLeft: '3%'}}>
              My Order
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity>
        <View style = {{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>

          <Image resizeMode='contain' source = {require('../../images/terms-and-condition.png')} style = {{height: 20, width: 20, tintColor: 'red'}}></Image>
          <Text style = {{fontSize: 17, color: 'gray', marginLeft: '3%'}}>Terms & Conditions</Text>

        </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity>
        <View style = {{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>

          <Image resizeMode='contain' source = {require('../../images/privacy-and-policy.png')} style = {{height: 20, width: 20, tintColor: 'red'}}></Image>
          <Text style = {{fontSize: 17, color: 'gray', marginLeft: '3%'}}>Privacy Policy</Text>

        </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Seven')}>
          <View
            style={{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>
            <Image
              resizeMode="contain"
              source={require('../../images/contact-us.png')}
              style={{height: 20, width: 20, tintColor: 'red'}}></Image>
            <Text style={{fontSize: 17, color: 'gray', marginLeft: '3%'}}>
              Contact Us
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity>
        <View style = {{flexDirection: 'row', marginLeft: '5%', marginTop: '8%'}}>

          <Image resizeMode='contain' source = {require('../../images/faqs.png')} style = {{height: 20, width: 20, tintColor: 'red'}}></Image>
          <Text style = {{fontSize: 17, color: 'gray', marginLeft: '3%'}}>FAQs</Text>

        </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{position: 'absolute', bottom: 0}}
          onPress={() => this.logOutFN()}>
          <View
            style={{flexDirection: 'row', marginLeft: '10%', marginTop: '3%'}}>
            <Image
              resizeMode="contain"
              source={require('../../images/logout.png')}
              style={{height: 25, width: 25, tintColor: 'red'}}></Image>
            <Text style={{fontSize: 20, color: 'gray', marginLeft: '3%'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Menu,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  Second: {
    screen: ProductList,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const ThirdActivity_StackNavigator = createStackNavigator({
  Third: {
    screen: Cart,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const FourthActivity_StackNavigator = createStackNavigator({
  Fourth: {
    screen: Checkout,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const FifthActivity_StackNavigator = createStackNavigator({
  Fifth: {
    screen: OrderCompletion,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const SixActivity_StackNavigator = createStackNavigator({
  Six: {
    screen: Myorder,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const SevenActivity_StackNavigator = createStackNavigator({
  Seven: {
    screen: ContactUs,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const EightActivity_StackNavigator = createStackNavigator({
  Eight: {
    screen: GasSubmission,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

const NineActivity_StackNavigator = createStackNavigator({
  Nine: {
    screen: RentACar,
    navigationOptions: ({navigation}) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'You Say We Deliver',
    }),
  },
});

export default MyDrawerNavigator = createDrawerNavigator(
  {
    FirstStack: {
      screen: FirstActivity_StackNavigator,
    },
    SecondStack: {
      screen: SecondActivity_StackNavigator,
    },
    ThirdStack: {
      screen: ThirdActivity_StackNavigator,
    },
    FourthStack: {
      screen: FourthActivity_StackNavigator,
    },
    FifthStack: {
      screen: FifthActivity_StackNavigator,
    },
    SixStack: {
      screen: SixActivity_StackNavigator,
    },
    SevenStack: {
      screen: SevenActivity_StackNavigator,
    },
    EightStack: {
      screen: EightActivity_StackNavigator,
    },
    NineStack: {
      screen: NineActivity_StackNavigator,
    },
  },
  {
    contentComponent: Custom_Side_Menu,
    drawerWidth: Dimensions.get('window').width - 80,
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default createAppContainer(TabNavigator, MyDrawerNavigator);
