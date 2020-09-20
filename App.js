import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Drawer from './src/screens/Drawer';
import Menu from './src/screens/Menu';
import TabNavigator from './src/screens/TopTab';
import Splashscreen from './src/screens/Splashscreen';
import Newsignup from './src/screens/Newsignup';
import Newsignin from './src/screens/Newsignin';
import ProductList from './src/screens/ProductList';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import CheckoutFinal from './src/screens/CheckoutFinal';
import Splash from './src/screens/Splash';
import OrderCompletion from './src/screens/OrderCompletion';
import Myorder from './src/screens/Myorder';
import GasSubmission from './src/screens/GasSubmission';
import RentACar from './src/screens/RentACar';

const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
        headerShown: false
    }
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
        headerShown: false
    }
  },

  RentACar: {
    screen: RentACar,
    navigationOptions: {
        headerShown: false
    }
  },
    Splashscreen: {
        screen: Splashscreen,
        navigationOptions: {
            headerShown: false
        }
      },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
          headerShown: false
      }
    },
      TabNavigator: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false
        }
      },
      Newsignup: {
        screen: Newsignup,
        navigationOptions: {
            headerShown: false
        }
      },
      Newsignin: {
        screen: Newsignin,
        navigationOptions: {
            headerShown: false
        }
      },
      Cart: {
        screen: Cart,
        navigationOptions: {
            headerShown: false
        }
      },
      Checkout: {
        screen: Checkout,
        navigationOptions: {
            headerShown: false
        }
      },
      CheckoutFinal: {
        screen: CheckoutFinal,
        navigationOptions: {
            headerShown: false
        }
      },
      OrderCompletion: {
        screen: OrderCompletion,
        navigationOptions: {
            headerShown: false
        }
      },

      ProductList: {
        screen: ProductList,
        navigationOptions: {
            headerShown: false
        }
      },
      Myorder: {
        screen: Myorder,
        navigationOptions: {
            headerShown: false
        }
      },
      GasSubmission: {
        screen: GasSubmission,
        navigationOptions: {
            headerShown: false
        }
      },
  });
  
  export default createAppContainer(AppNavigator);