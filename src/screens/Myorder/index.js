import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {NavigationEvents} from 'react-navigation';

const PendingData = [
  {
    id: '1',
    title: 'King Prawns',
    quantity: '250 g',
    price: '100',
    image: 'Burger.jpg',
  },
];

class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOrder: [],
      shops: [],
      activeDeals: [],
      userID: global.userid,
      showdeals: false,
    };
    //this.insertIntoUser();
  }

  componentDidMount() {
    this.getActiveProduct();
  }

  async getActiveProduct() {
    //console.log("Yes : "+this.state.userID)
    await fetch(global.address + 'showOrdersofUserinApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderCreatedBy: global.userid,
        orderStatus: 'Pending',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          activeOrder: responseJson,
        });
        // console.log('This working Well');
        // console.log("Active Orders ..........")
        // console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
    this.getActiveDeals();
  }

  async getActiveDeals() {
    console.log('Yes : ' + this.state.userID);
    await fetch(global.address + 'ShowDealsforapp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userID,
        status: 'Pending',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          activeDeals: responseJson,
        });
        // console.log('This working Well');
        // console.log("Active deals ..........")
        // console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  showdealFN() {
    this.setState({
      showdeals: true,
    });
  }

  showproductFN() {
    this.setState({
      showdeals: false,
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={() => this.getActiveProduct()} />

        {this.state.showdeals == false ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 80,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: '5%',
              marginTop: 10,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => this.showdealFN()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Deals</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 90,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: '7%',
              marginTop: 10,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => this.showproductFN()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Products</Text>
          </TouchableOpacity>
        )}

        {this.state.showdeals == false ? (
          <FlatList
            data={this.state.activeOrder}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    height: 100,
                    borderRadius: 10,
                    width: '80%',
                    marginTop: '3%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderWidth: 1.5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 50,
                        marginTop: '7%',
                        marginLeft: '-8%',
                      }}
                      //source = {require('../../Image/Burger.png')}
                      source={{uri: global.address + item.productImage}}
                      resizeMode="stretch"
                    />

                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginLeft: '8%',
                          marginTop: '10%',
                        }}>
                        {item.productName}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 15, marginLeft: '8%'}}>
                          Items: {item.QTY}
                        </Text>

                        <Text style={{fontSize: 15, marginLeft: '27%'}}>
                          ${item.productSalePrice} per item
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={{marginBottom: 10}}
          />
        ) : (
          <FlatList
            data={this.state.activeDeals}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => this.Check('' + index)}>
                <View style={{marginTop: '5%'}}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      height: 150,
                      width: '85%',
                      borderRadius: 10,
                    }}
                    source={{uri: global.address + item.deal_Img}}></Image>

                  <View
                    style={{
                      marginLeft: '10%',
                      flexDirection: 'row',
                      marginTop: '2%',
                    }}>
                    <View style={{width: '60%'}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {item.dealName}
                      </Text>
                    </View>

                    <Text style={{fontSize: 20, color: 'red'}}>
                      & Rs.{item.dealPrice}
                    </Text>
                  </View>

                  {/* <Text style={{ fontSize: 15, color: 'gray', marginLeft: '10%', }}>
                $$$ . {item.description}
            </Text> */}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
}

class Past extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOrder: [],
      shops: [],
      userID: global.userid,
      showdeals: false,
      pastDeals: [],
    };
    //this.insertIntoUser();
  }

  componentDidMount() {
    this.getPastProduct();
  }

  async getPastProduct() {
    //console.log("Yes : "+this.state.userID)
    await fetch(global.address + 'showOrdersofUserinApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderCreatedBy: global.userid,
        orderStatus: 'Completed',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          activeOrder: responseJson,
        });
        console.log('This working Well');
        console.log('Active Orders1212 ..........');
        console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
    this.getActiveDeals();
  }

  async getActiveDeals() {
    console.log('Yes : ' + this.state.userID);
    await fetch(global.address + 'ShowDealsforapp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userID,
        status: 'Completed',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          pastDeals: responseJson,
        });
        // console.log('This working Well');
        // console.log("Active deals ..........")
        // console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  callFunctionFN() {
    this.setState({
      userID: global.userid,
    });
    this.getPastProduct();
  }

  showdealFN() {
    this.setState({
      showdeals: true,
    });
  }

  showproductFN() {
    this.setState({
      showdeals: false,
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={() => this.callFunctionFN()} />

        {this.state.showdeals == false ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 80,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: '5%',
              marginTop: 10,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => this.showdealFN()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Deals</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 90,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: '7%',
              marginTop: 10,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => this.showproductFN()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Products</Text>
          </TouchableOpacity>
        )}

        {this.state.showdeals == false ? (
          <FlatList
            data={this.state.activeOrder}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    height: 100,
                    borderRadius: 10,
                    width: '80%',
                    marginTop: '3%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderWidth: 1.5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 50,
                        marginTop: '7%',
                        marginLeft: '-8%',
                      }}
                      //source = {require('../../Image/Burger.png')}
                      source={{uri: global.address + item.productImage}}
                      resizeMode="stretch"
                    />

                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginLeft: '8%',
                          marginTop: '10%',
                        }}>
                        {item.productName}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 15, marginLeft: '8%'}}>
                          Items: {item.QTY}
                        </Text>

                        <Text style={{fontSize: 15, marginLeft: '27%'}}>
                          ${item.productSalePrice} per item
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={{marginBottom: 10}}
          />
        ) : (
          <FlatList
            data={this.state.pastDeals}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => this.Check('' + index)}>
                <View style={{marginTop: '5%'}}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      height: 150,
                      width: '85%',
                      borderRadius: 10,
                    }}
                    source={{uri: global.address + item.deal_Img}}></Image>

                  <View
                    style={{
                      marginLeft: '10%',
                      flexDirection: 'row',
                      marginTop: '2%',
                    }}>
                    <View style={{width: '60%'}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {item.dealName}
                      </Text>
                    </View>

                    <Text style={{fontSize: 20, color: 'red'}}>
                      & Rs.{item.dealPrice}
                    </Text>
                  </View>

                  {/* <Text style={{ fontSize: 15, color: 'gray', marginLeft: '10%', }}>
      $$$ . {item.description}
  </Text> */}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Active: {
      screen: Active,
      navigationOptions: {
        tabBarLabel: 'Active',
      },
    },
    Past: {
      screen: Past,
      navigationOptions: {
        tabBarLabel: 'Past',
      },
    },
  },
  {
    initialRouteName: 'Active',
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      labelStyle: {fontSize: 17},
      style: {backgroundColor: 'transparent'},
    },
  },
);

export default createAppContainer(TabNavigator);
