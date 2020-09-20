import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TopTab from '../TopTab';
import Newsignin from '../Newsignin';
import {NavigationEvents} from 'react-navigation';

//global.address = 'https://forsaken.a2hosted.com/groceryapp/';

global.address = 'https://fatafat1041.com/groceryapp/';

//global.address = 'http://192.168.10.17:3000/';

console.disableYellowBox = true;

let categoryId = '';

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

const CategoryData = [
  {
    id: '1',
    titleImage: require('../../images/test.png'),
    categoryname: 'Food',
  },
  {
    id: '2',
    titleImage: require('../../images/food.png'),
    categoryname: 'Food',
  },
  {
    id: '3',
    titleImage: require('../../images/orange.jpg'),
    categoryname: 'Food Court',
  },
  {
    id: '4',
    titleImage: require('../../images/food.png'),
    categoryname: 'Food Court',
  },
  {
    id: '5',
    titleImage: require('../../images/food.png'),
    categoryname: 'Food',
  },
  {
    id: '6',
    titleImage: require('../../images/food.png'),
    categoryname: 'Food',
  },
];

// global.email ='';
// global.password = '';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      shops: [],
      DATA: [],
      showForm: 1,
      shopName: '',
      shopDiscription: '',
      showFlat: '1',
      userID: global.userid,
      buttonView1: false,
      heightFlat: 10,
      indigat: true,
    };
    //this.insertIntoUser();
  }

  // ////////////////////

  searchItem = (upsearch) => {
    let shopID = '';

    shopID = '12';
    // this.setState({
    //   input_searchProduct:upsearch
    //  })
    if (upsearch != '') {
      this.setState({
        showForm: '2',
      });
      this.search(shopID, upsearch);
    } else {
      //Alert.alert(""+shopID);
      // this.getProductByShopId(shopID);
      this.setState({
        showForm: '1',
      });

    }
  };


  async search(shopID, upsearch) {
    //   this.setState({
    //       input_searchProduct:inputsearch
    // })
    // alert(this.state.input_searchProduct);
    await fetch(global.address + 'searchCheck', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: upsearch,
        shopId: shopID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // alert(responseJson);
        if (responseJson == '') {
          this.getProductByShopId(shopID);
        }
        this.setState({
          DATA: responseJson,
        });

        for (let i = 0; i < this.state.DATA.length; i++) {
          var amountBF = this.state.DATA[i].productSalePrice;
          var percent = this.state.DATA[i].productDiscount;
          var Disc = (amountBF * percent) / 100;
          var amountADisc = amountBF - Disc;

          this.state.DATA[i].discountAmount = amountADisc;
          //console.log(""+i+'=> Original Amount : '+amountBF+'......percent : '+percent+'.......Discount: '+ Disc+"....amountAfter : "+amountADisc+"......inState : "+this.state.DATA[i].discountAmount+"\n")
        }

        var arr = this.state.DATA;
        this.setState({
          DATA: arr,
          indigat: false,
        });
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }


  // /////////////////

  componentDidMount() {
    this.assignSesionFn();
    //this.sessionFN();
    //Alert.alert(""+global.address)
    this.getCategory();
    this.sessionLoginFN();
  }
  async assignSesionFn() {
    global.email = await AsyncStorage.getItem('id');
    global.password = await AsyncStorage.getItem('pass');
  }

  async getCategory() {
    //Alert.alert("Unial");
    await fetch(global.address + 'getCategoriesWithoutId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          category: responseJson,
        });
        //   console.log('This working Well');
        //   console.log(this.state.category);
        //let index = this.state.category[0].categoryId;
        //  Alert.alert(''+index)
        this.getShopAgainstCategory('0');
      })
      .catch((error) => {
        // Alert.alert('Error', error.message)
      });
  }

  async getShopAgainstCategory(index) {
    let categoryid = this.state.category[index].categoryId;
    //console.log("Category ID: "+categoryid);
    //Alert.alert("Unial");
    await fetch(global.address + 'getShopsByCategoryId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: categoryid,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          shops: responseJson,
          indigat: false,
        });
        // console.log('This working Well');
        // console.log("Shops ..........")
        //    console.log(responseJson);
      })
      .catch((error) => {
        // Alert.alert('Error', error.message)
      });
  }

  Check(index) { 
    //Alert.alert(""+this.state.shops[index].shopId);
    this.setState({
      indigat: true,
    });
    if(this.state.shops[index].categoryId=='6'){
      if (this.state.userID === '') {
        Alert.alert('Please login!');
        this.props.navigation.navigate('Newsignin');
      }else{
    //  let carInfo= this.state.shops[index].shopName
    //   this.props.navigation.navigate('Checkout',{

    //     orderList:'',
    //     deal:'',
    //     deliveryExpectedTime:'',
    //     deliveryAdd:'',
    //     delivFee:'',
    //     SubTotal:'',
    //     serFee:'',
    //     gst:'carRent',
    //     discT:'',
    //     gTotal:carInfo
    //   });
// ///////////////////////////////////////////

// this.setState({
//   indigat: false,
//   showForm: '8',
// });


let idShop = this.state.shops[index].shopId;
this.props.navigation.navigate('Nine', {shopID: idShop});



    }
    }else{
    let idShop = this.state.shops[index].shopId;
    this.props.navigation.navigate('Second', {shopID: idShop});
    }
  }

  checkIndexFN(index) {
    this.setState({
      indigat: true,
    });
    if (index == 2) {
      this.setState({
        showForm: '0',
        indigat: false,
        // categoryID: this.state.category[index].categoryId,
      });
      categoryId = this.state.category[index].categoryId;

      //Alert.alert(''+categoryId);
    } else if (index == 3 || index == 4) {
      //console.log('Abc......')
      this.setState({
        showForm: '2',
      });

      console.log(this.state.showForm);
      categoryId = this.state.category[index].categoryId;

      //Alert.alert(''+categoryId);
      this.getProductAgainstCategory(categoryId);
    }
     else {
      this.setState({
        showForm: '1',
      });
      this.getShopAgainstCategory(index);
    }
  }

  async getProductAgainstCategory(categoryId) {
    //console.log('zaka...')
    await fetch(global.address + 'getProductBycategoryIDNew', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: categoryId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log(responseJson)

        this.setState({
          DATA: responseJson,
        });

        //console.log(this.state.DATA);
        for (let i = 0; i < this.state.DATA.length; i++) {
          var amountBF = this.state.DATA[i].productSalePrice;
          var percent = this.state.DATA[i].productDiscount;
          var Disc = (amountBF * percent) / 100;
          var amountADisc = amountBF - Disc;

          this.state.DATA[i].discountAmount = amountADisc;
        }

        var arr = this.state.DATA;
        this.setState({
          DATA: arr,
          indigat: false,
        });
        //  console.log(this.state.DATA)
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  checkGasFormInputFN() {
    if (this.state.shopName == '') {
      Alert.alert('Please Enter Shop Name');
    } else if (global.userid == '') {
      Alert.alert('Please Login!');
      this.props.navigation.navigate('Newsignin');
    }
    // else if(this.state.shopDiscription == ''){
    //     Alert.alert('Please Enter Shop Discription')
    // }
    else {
      this.insertGasCompony();
    }
  }

  async insertGasCompony() {
    var currentDate = new Date().getDate(); //Current Date
    currentDate = currentDate < 10 ? '0' + currentDate : '' + currentDate;
    var currentMonth = new Date().getMonth() + 1; //Current Month
    currentMonth = currentMonth < 10 ? '0' + currentMonth : '' + currentMonth;
    var currentYear = new Date().getFullYear(); //Current Year

    var curentDate = '' + currentYear + '-' + currentMonth + '-' + currentDate;
    //Alert.alert(''+categoryId);
    await fetch(global.address + 'insertIntoShopofGas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gasShopName: this.state.shopName,
        gasDiscription: this.state.shopDiscription,
        userId: global.userid,
        gasOrderDate: curentDate,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.navigation.navigate('Eight');
        //   Alert.alert('Submited Successfully!');
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  changeButton(index) {
    if (global.userid === '') {
      Alert.alert('Please login!');
      this.props.navigation.navigate('Newsignin');
    } else {
      this.state.DATA[index].buttonView = 'true';
      var arr = [];
      arr = this.state.DATA;
      this.setState({
        DATA: arr,
      });
      this.setState({
        buttonView1: true,
        heightFlat: 90,
      });

      this.insertIntoCart(index);
    }
  }
  async insertIntoCart(index) {
    await fetch(global.address + 'insertIntoAddToCart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: this.state.DATA[index].productId,
        userID: this.state.userID,
        orderQty: '1',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('This working Well');
        // console.log("Shops ..........")
        //    console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message);
      });
  }

  changeButton1(index) {
    this.state.DATA[index].buttonView = 'false';
    var arr = [];
    arr = this.state.DATA;
    this.setState({
      DATA: arr,
    });
    this.setState({
      buttonView1: true,
      heightFlat: 77,
    });

    this.removeAddtoCart(index);
  }

  async removeAddtoCart(index) {
    await fetch(global.address + 'updateIntoAddtoCartFN', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '2',
        productID: this.state.DATA[index].productId,
        userID: this.state.userID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('This working Well');
        // console.log("Shops ..........")
        //    console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message);
      });
  }

  assignUserIdFN() {
    this.setState({
      userID: global.userid,
    });
  }

  async sessionFN() {
    let abs = global.id;
    // Alert.alert('your session id : '+ abs);
  }

  sessionLoginFN() {
    if (
      (global.email != null && global.password != null) ||
      (global.email != undefined && global.password != undefined)
    ) {
      fetch(global.address + 'fetchuserid', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: global.email,
          userPassword: global.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          // global.userid = Object.values(responseJson[0]);
          global.userid = responseJson[0].userId;
          global.userName =
            responseJson[0].userFirstName + responseJson[0].userLastName;
        })
        .catch((error) => {
          //Alert.alert('Error', error.message)
        });
    }
  }
  async functionCallFN() {
    this.assignUserIdFN();

    global.email = await AsyncStorage.getItem('id');
    global.password = await AsyncStorage.getItem('pass');

    // Alert.alert('email : '+global.password);

    //this.sessionFN()
    for (let i = 0; i < this.state.DATA.length; i++) {
      this.state.DATA[i].buttonView = 'false';
    }
    this.setState({
      heightFlat: 10,
      buttonView1: false,
      indigat: true,
    });

    this.sessionLoginFN();
    this.getCategory();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onDidFocus={() => this.functionCallFN()} />

        {/* <Icon onPress={() => this.props.navigation.openDrawer()}
                    style={{ marginLeft: '5%', marginTop: '5%' }} name="ios-menu" size={30} color="#900" /> */}

{/* <View
                style={{
                  width: '100%',
                  height: 45,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingLeft: '10%',
                }}>
                <Image
                  style={{marginTop: 9}}
                  source={require('../../images/searchIcon.png')}
                />
                <TextInput
                  onChangeText={(TextInputValue) =>
                    this.searchItem(TextInputValue)
                  }
                  style={{width: '100%', height: 45, backgroundColor: '#fff'}}
                  placeholder="What are you looking for (e.g mango,onion)"></TextInput>
              </View> */}

              
        <View
                style={{
                  width: '100%',
                  height: 45,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingLeft: '10%',
                }}>
                <Image
                  style={{marginTop: 9}}
                  source={require('../../images/searchIcon.png')}
                />
                <TextInput
                  onChangeText={(TextInputValue) =>
                    this.searchItem(TextInputValue)
                  }
                  style={{width: '100%', height: 45, backgroundColor: '#fff'}}
                  placeholder="What are you looking for (e.g mango,onion)"></TextInput>
              </View>


        <View style={{marginHorizontal: '7%', marginTop: '5%'}}>





          <FlatList
            horizontal={true}
            data={this.state.category}
            renderItem={({item, index}) => (
              <View style={{}}>
                <TouchableOpacity onPress={() => this.checkIndexFN('' + index)}>
                  <View style={{marginHorizontal: 5}}>
                    <Image
                      style={{height: 30, width: 27, alignSelf: 'center'}}
                      resizeMode="stretch"
                      source={{
                        uri: global.address + item.categoryIcon,
                      }}></Image>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '100',
                        alignSelf: 'center',
                      }}>
                      {item.categoryName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {this.state.indigat == true ? (
          <View style={[styles.container1, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                      <ActivityIndicator size="large" color="#0000ff" />
                      <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View>
            {this.state.showForm == '1' ? (
              <FlatList
                data={this.state.shops}
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
                        source={{
                          uri: global.address + item.shopBannerImage,
                        }}></Image>

                      <View
                        style={{
                          marginLeft: '10%',
                          flexDirection: 'row',
                          marginTop: '2%',
                        }}>
                        <View style={{width: '60%'}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {item.shopName}
                          </Text>
                        </View>

                        {/* <Text style={{ fontSize: 20, color: 'red' }}>
                                        & {item.shopDeliveryTime} mins
                                    </Text> */}
                      </View>

                      {/* <Text style={{ fontSize: 15, color: 'gray', marginLeft: '10%', }}>
                                    $$$ . {item.description}
                                </Text> */}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={{marginBottom: '25%'}}
              />
            ) : null}

            {this.state.showForm == '0' ? (
              <ScrollView
                style={{alignSelf: 'center', width: '92%', marginTop: 12}}>
                <View
                  style={{
                    width: '100%',
                    height: 450,
                    backgroundColor: '#e0f2f1',
                    borderColor: '#A4A4A4',
                    borderWidth: 2,
                  }}>
                  <TextInput
                    style={{
                      height: 55,
                      fontSize: 17,
                      paddingLeft: '3%',
                      color: 'black',
                      width: '85%',
                      marginTop: '10%',
                      marginHorizontal: '7.5%',
                      borderColor: '#A4A4A4',
                      borderWidth: 2,
                      borderRadius: 5,
                    }}
                    onChangeText={(TextInputValue) =>
                      this.setState({shopName: TextInputValue})
                    }
                    placeholder="Company Name"
                  />

                  <TextInput
                    style={{
                      marginBottom: '10%',
                      height: 150,
                      fontSize: 17,
                      paddingLeft: '3%',
                      color: 'black',
                      width: '85%',
                      marginTop: '12%',
                      marginHorizontal: '7.5%',
                      borderColor: '#A4A4A4',
                      borderWidth: 2,
                      borderRadius: 5,
                    }}
                    onChangeText={(TextInputValue) =>
                      this.setState({shopDiscription: TextInputValue})
                    }
                    placeholder="Any further detail(optional)"
                    multiline={true}
                  />

                  <TouchableOpacity
                    onPress={() => this.checkGasFormInputFN()}
                    style={{
                      height: 45,
                      width: '70%',
                      borderRadius: 10,
                      alignSelf: 'center',
                      backgroundColor: 'red',
                      marginVertical: '10%',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Raleway-Bold',
                        color: 'white',
                        alignSelf: 'center',
                        marginVertical: 12,
                      }}>
                      Submit!
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
            {this.state.showForm == '2' ? (
              <View style={{width: '100%', height: '90%'}}>
                <FlatList
                  data={this.state.DATA}
                  renderItem={({item, index}) => (
                    // <Item itemname={item.itemname} offpercen={item.offpercen} itemImages={item.itemImages} type={item.type} storageLife={item.storageLife} qty={item.qty} discountPrice={item.discountPrice} currentPrice={item.currentPrice}/>
                    <View>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          width: '90%',
                          marginTop: 10,
                          marginLeft: '5%',
                        
                        }}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          {/* Content View */}
                          <View>
                            <View
                              style={{
                                marginLeft: 12,
                                width: 40,
                                backgroundColor: '#de4e48',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  textAlign: 'center',
                                  color: '#fff',
                                }}>
                                -{item.productDiscount}%
                              </Text>
                            </View>
                            <View>
                              <Image
                                style={{
                                  height: 85,
                                  width: 85,
                                  borderRadius: 10,
                                  marginLeft: 3,
                                }}
                                source={{
                                  uri: global.address + item.productImage,
                                }}
                                resizeMode="stretch"
                              />
                            </View>
                          </View>
                          {/* 2nd item View */}
                          <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                              {item.productName}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '75%',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'flex-start',
                                  marginTop: 5,
                                  width: '85%',
                                }}>
                                <Text style={styles.typeTextIs}>
                                  Description
                                </Text>
                                <Text style={styles.typeRegular}>
                                  {item.productDescription}
                                </Text>
                              </View>

                              <View
                                style={{
                                  justifyContent: 'flex-end',
                                  width: '15%',
                                }}>
                                <Text style={styles.typeTextIs}>QTY</Text>
                                <Text style={styles.typeRegular}>
                                  {item.productQuantity}
                                </Text>
                              </View>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 7}}>
                              <View style={{}}>
                                {/* <Text style={{ fontSize: 12, textDecorationLine: 'line-through' }}>Rs.{item.productSalePrice}</Text>
                          <Text style={{ color: '#e89439', fontSize: 16, fontWeight: 'bold' }}>Rs.{item.discountAmount}</Text> */}
                              </View>
                              {/* //////////Button View Start////// */}
                              <View>
                                {
                                  item.buttonView == 'false' ? (
                                    <View>
                                      <TouchableOpacity
                                        style={{
                                          backgroundColor: 'red',
                                          width: 80,
                                          height: 30,
                                          marginLeft: '55%',
                                          marginTop: 5,
                                          justifyContent: 'center',
                                          borderRadius: 50,
                                        }}
                                        onPress={() =>
                                          this.changeButton('' + index)
                                        }>
                                        <Text
                                          style={{
                                            textAlign: 'center',
                                            color: '#fff',
                                          }}>
                                          ADD
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  ) : (
                                    <View>
                                      <TouchableOpacity
                                        style={{
                                          backgroundColor: 'red',
                                          width: 80,
                                          height: 30,
                                          marginLeft: '55%',
                                          marginTop: 5,
                                          justifyContent: 'center',
                                          borderRadius: 50,
                                        }}
                                        onPress={() =>
                                          this.changeButton1('' + index)
                                        }>
                                        <Text
                                          style={{
                                            textAlign: 'center',
                                            color: '#fff',
                                          }}>
                                          UNDO
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )
                                  // <View>
                                  //   <View style={{ marginTop: 5, marginLeft: '35%' }}>
                                  //     <View style={{
                                  //       flexDirection: 'row', justifyContent: 'space-around', width: 80, alignItems: 'center',
                                  //       borderRadius: 25, borderWidth: .3, marginBottom: '1%', marginRight: '5%', backgroundColor: 'red'
                                  //     }}>

                                  //       {/* <TouchableOpacity style={{}}
                                  //         style={{}}
                                  //         onPress={() => this.subtract("" + index)}
                                  //       // onPress={window.index.add()}
                                  //       >
                                  //         <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}> - </Text>
                                  //       </TouchableOpacity>

                                  //       <Text style={{ color: '#fff' }}>
                                  //         {item.count}
                                  //       </Text>
                                  //       <TouchableOpacity
                                  //         style={styles.button}
                                  //         onPress={() => this.add("" + index)}
                                  //       >
                                  //         <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}> + </Text>
                                  //       </TouchableOpacity> */}
                                  //     </View>

                                  //   </View>

                                  // </View>
                                }
                                {/* View End */}
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{height: 5, width: '100%'}}></View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  style={{marginTop: 10, marginBottom: this.state.heightFlat}}
                />

                {this.state.buttonView1 == true ? (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Third',{
                      RECAR:''
                    })}
                    style={{
                      height: 20,
                      width: '65%',
                      borderRadius: 10,
                      alignSelf: 'center',
                      backgroundColor: 'red',
                      marginVertical: '10%',
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: 0.5,
                      // marginBottom:1
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      View Cart
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c0c3c4',
    width: '100%',
    height: '100%',
  },

  typeTextIs: {
    fontSize: 12,
  },

  typeRegular: {
    fontSize: 14,
    fontWeight: 'bold',
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
