import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

const ShopData1 = [
  {
    id: '1',
    titleImage: require('../../images/titlefood.jpeg'),
    shopname: 'Pizza Valley',
    time: '52 mins',
    description: 'Fast Food . Pizza',
  },
  {
    id: '2',
    titleImage: require('../../images/titlefood.jpeg'),
    shopname: 'Pizza Valley',
    time: '52 mins',
    description: 'Fast Food . Pizza',
  },
  {
    id: '3',
    titleImage: require('../../images/titlefood.jpeg'),
    shopname: 'Pizza Valley',
    time: '52 mins',
    description: 'Fast Food . Pizza',
  },
  {
    id: '4',
    titleImage: require('../../images/titlefood.jpeg'),
    shopname: 'Pizza Valley',
    time: '52 mins',
    description: 'Fast Food . Pizza',
  },
];

export default class TopTab extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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

        <FlatList
          data={ShopData1}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProductList')}>
              <View style={{marginTop: '5%'}}>
                <Image
                  style={{
                    alignSelf: 'center',
                    height: 150,
                    width: '85%',
                    borderRadius: 10,
                  }}
                  source={item.titleImage}></Image>

                <View
                  style={{
                    marginLeft: '10%',
                    flexDirection: 'row',
                    marginTop: '2%',
                  }}>
                  <View style={{width: '60%'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {item.shopname}
                    </Text>
                  </View>

                  <Text style={{fontSize: 20, color: 'orange'}}>
                    & {item.time}
                  </Text>
                </View>

                <Text style={{fontSize: 15, color: 'gray', marginLeft: '10%'}}>
                  $$$ . {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

//   class IceCream extends React.Component {
//     render() {
//       return (
//         <View style = {{flex: 1, backgroundColor: 'white' }}>
//         <FlatList

//         data = {ShopData}
//         renderItem = { ({ item }) =>

//         <View style = {{flex: 1, marginTop: '5%'}}>

//             <Image style = {{alignSelf: 'center', height: 150, width: '85%', borderRadius: 10}} source = {item.titleImage} ></Image>

//             <View style = {{marginLeft: '10%', flexDirection: 'row', marginTop: '2%'}}>

//                 <View style = {{width: '60%'}}>

//                     <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
//                         {item.shopname}
//                     </Text>
//                 </View>

//                 <Text style = {{fontSize: 20, color: 'orange'}}>
//                     & {item.time}
//                 </Text>
//             </View>

//             <Text style = {{fontSize: 15, color: 'gray', marginLeft: '10%', }}>
//                 $$$ . {item.description}
//             </Text>
//         </View>

//     }

//     keyExtractor={item => item.id}

//     />

// </View>
//       );
//     }
//   }

//   class Vegan extends React.Component {
//     render() {
//       return (
//         <View style = {{flex: 1, backgroundColor: 'white' }}>
//         <FlatList

//         data = {ShopData}
//         renderItem = { ({ item }) =>

//         <View style = {{flex: 1, marginTop: '5%'}}>

//             <Image style = {{alignSelf: 'center', height: 150, width: '85%', borderRadius: 10}} source = {item.titleImage} ></Image>

//             <View style = {{marginLeft: '10%', flexDirection: 'row', marginTop: '2%'}}>

//                 <View style = {{width: '60%'}}>

//                     <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
//                         {item.shopname}
//                     </Text>
//                 </View>

//                 <Text style = {{fontSize: 20, color: 'orange'}}>
//                     & {item.time}
//                 </Text>
//             </View>

//             <Text style = {{fontSize: 15, color: 'gray', marginLeft: '10%', }}>
//                 $$$ . {item.description}
//             </Text>
//         </View>

//     }

//     keyExtractor={item => item.id}

//     />

// </View>
//       );
//     }
//   }

//   class Barbecue extends React.Component {
//     render() {
//       return (
//         <View style = {{flex: 1, backgroundColor: 'white' }}>
//         <FlatList

//         data = {ShopData}
//         renderItem = { ({ item }) =>

//         <View style = {{flex: 1, marginTop: '5%'}}>

//             <Image style = {{alignSelf: 'center', height: 150, width: '85%', borderRadius: 10}} source = {item.titleImage} ></Image>

//             <View style = {{marginLeft: '10%', flexDirection: 'row', marginTop: '2%'}}>

//                 <View style = {{width: '60%'}}>

//                     <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
//                         {item.shopname}
//                     </Text>
//                 </View>

//                 <Text style = {{fontSize: 20, color: 'orange'}}>
//                     & {item.time}
//                 </Text>
//             </View>

//             <Text style = {{fontSize: 15, color: 'gray', marginLeft: '10%', }}>
//                 $$$ . {item.description}
//             </Text>
//         </View>

//     }

//     keyExtractor={item => item.id}

//     />

// </View>
//       );
//     }
//   }

//   class Catering extends React.Component {
//     render() {
//       return (
//         <View style = {{flex: 1, backgroundColor: 'white' }}>
//         <FlatList

//         data = {ShopData}
//         renderItem = { ({ item }) =>

//         <View style = {{flex: 1, marginTop: '5%'}}>

//             <Image style = {{alignSelf: 'center', height: 150, width: '85%', borderRadius: 10}} source = {item.titleImage} ></Image>

//             <View style = {{marginLeft: '10%', flexDirection: 'row', marginTop: '2%'}}>

//                 <View style = {{width: '60%'}}>

//                     <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
//                         {item.shopname}
//                     </Text>
//                 </View>

//                 <Text style = {{fontSize: 20, color: 'orange'}}>
//                     & {item.time}
//                 </Text>
//             </View>

//             <Text style = {{fontSize: 15, color: 'gray', marginLeft: '10%', }}>
//                 $$$ . {item.description}
//             </Text>
//         </View>

//     }

//     keyExtractor={item => item.id}

//     />

// </View>
//       );
//     }
//   }

// const TabNavigator = createMaterialTopTabNavigator({
//   Indian: {
//     screen: Indian,
//     navigationOptions: {
//       tabBarLabel: 'Food',
//       tabBarIcon: ({ tintColor }) => (
//         <Image style={{ height: 30, width: 30, tintColor: tintColor, alignSelf: 'center' }} source={require('../../images/food.png')} />
//       )
//     }
//   },
// IceCream: {
//   screen:IceCream,
//   navigationOptions:{
//     tabBarLabel:'Tiffen',
//     tabBarIcon: ({ tintColor }) => (
//       <Image style={{ height: 30, width: 30, tintColor: tintColor, alignSelf: 'center' }} source={require('../../images/food.png')} />
//   )
//   }
// },
// Vegan: {
//   screen:Vegan,
//   navigationOptions:{
//     tabBarLabel:'Panty',
//     tabBarIcon: ({ tintColor }) => (
//       <Image style={{ height: 30, width: 30, tintColor: tintColor, alignSelf: 'center' }} source={require('../../images/food.png')} />
//   )
//   }
// },
// Barbecue: {
//   screen:Barbecue,
//   navigationOptions:{
//     tabBarLabel:'Pharma',
//     tabBarIcon: ({ tintColor }) => (
//       <Image style={{ height: 30, width: 30, tintColor: tintColor, alignSelf: 'center' }} source={require('../../images/food.png')} />
//   )
//   }
// },
// Catering: {
//   screen:Catering,
//   navigationOptions:{
//     tabBarLabel:'Erand',
//     tabBarIcon: ({ tintColor }) => (
//       <Image style={{ height: 30, width: 30, tintColor: tintColor, alignSelf: 'center' }} source={require('../../images/food.png')} />
//   )
//   }
// },
// },
//   {
//     initialRouteName: "Indian",
//     tabBarOptions: {
//       scrollEnabled: true,
//       upperCaseLabel: false,
//       activeTintColor: 'orange',
//       inactiveTintColor: 'black',
//       labelStyle: { fontSize: 17 },
//       showIcon: true,
//       tabStyle: { width: 'auto' },
//       style: { backgroundColor: 'transparent' },
//     }
//   },
// )

// export default createAppContainer(TabNavigator);
