import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

const DATA1 = [
  {
    id: '1',
    itemname: 'Washingon Apples',
    offpercen: '-25%',
    itemImages: require('../../images/apples.jpg'),
    type: 'Regular',
    storageLife: '3 Days',
    qty: '3 Units',
    discountPrice: 'Rs.128.00',
    currentPrice: 'Rs.90.40',
    count: '1',
    buttonView: 'false',
  },

  {
    id: '2',
    itemname: 'Washingon Apples',
    offpercen: '-25%',
    itemImages: require('../../images/apples.jpg'),
    type: 'Regular',
    storageLife: '3 Days',
    qty: '3 Units',
    discountPrice: 'Rs.128.00',
    currentPrice: 'Rs.90.40',
    count: '1',
    buttonView: 'false',
  },

  {
    id: '3',
    itemname: 'Washingon Apples',
    offpercen: '-25%',
    itemImages: require('../../images/Les-fruits.png'),
    type: 'Regular',
    storageLife: '3 Days',
    qty: '3 Units',
    discountPrice: 'Rs.128.00',
    currentPrice: 'Rs.90.40',
    count: '1',
    buttonView: 'false',
  },

  {
    id: '4',
    itemname: 'Washingon Apples',
    offpercen: '-25%',
    itemImages: require('../../images/orange.jpg'),
    type: 'Regular',
    storageLife: '3 Days',
    qty: '3 Units',
    discountPrice: 'Rs.128.00',
    currentPrice: 'Rs.90.40',
    count: '1',
    buttonView: 'false',
  },

  {
    id: '5',
    itemname: 'Washingon Apples',
    offpercen: '-25%',
    itemImages: require('../../images/stubry.jpg'),
    type: 'Regular',
    storageLife: '3 Days',
    qty: '3 Units',
    discountPrice: 'Rs.128.00',
    currentPrice: 'Rs.90.40',
    count: '1',
    buttonView: 'false',
  },
];

export default class index extends Component {
  // state = {
  //     search: '',
  //   };

  constructor(props) {
    super(props);
    this.state = {
      buttonView1: false,
      heightFlat: 10,
      count: 1,
      DATA: [],
      userID: global.userid,
      indigat: true,
      showdeals: false,
      DATA1: [],
      dealButton: false,
    };
  }

  componentDidMount() {
    // let shopID = '';
    // shopID = this.props.navigation.state.params.shopID;
    // //Alert.alert(""+shopID);
    // this.getProductByShopId(shopID);
    //   this.setState({
    //     DATA : DATA1,
    // });
  }

  assignUserIdFN() { 
    this.setState({
      userID: global.userid,
    });
  }

  //////////////fetch Deals Data///////////////////

  async fetchDealsData(shopId) {
    await fetch(global.address + 'getDealsforapp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopid: shopId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          DATA1: responseJson,
        });

        // console.log(responseJson);
        //  console.log(shopId);

        //  this.getAddToCart();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message);
      });
  }
  //////Serch start

  searchItem = (upsearch) => {
    let shopID = '';

    shopID = this.props.navigation.state.params.shopID;
    // this.setState({
    //   input_searchProduct:upsearch
    //  })
    if (upsearch != '') {
      this.search(shopID, upsearch);
    } else {
      //Alert.alert(""+shopID);
      this.getProductByShopId(shopID);
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

  ///search end

  async getProductByShopId(shopID) {
    await fetch(global.address + 'getProductByShopId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopId: shopID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          DATA: responseJson,
        });
        //Alert.alert(''+this.state.DATA.length)
        //console.log('Loop Starting...')
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

        //    console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  //   add = () => {
  //     this.setState({
  //         count: this.state.count + 1
  //     })
  // }

  add(index) {
    // Alert.alert(''+index);
    let countAdd = this.state.DATA[index].count;
    countAdd = parseInt(countAdd) + 1;
    //  Alert.alert(''+countAdd)
    this.state.DATA[index].count = countAdd;

    var arr = this.state.DATA;

    this.setState({
      DATA: arr,
    });
  }

  subtract(index) {
    // Alert.alert(''+Object.values(DATA1[0].count))
    // console.log(''+DATA1[0].count)
    //let countNo =DATA1[index].count;
    //countNo = countNo.join().trim();
    //Alert.alert(''+countNo);

    if (this.state.DATA[index].count <= 0) {
      this.state.DATA[index].count == 0;
    } else {
      var trynum = this.state.DATA[index].count;
      trynum = trynum - 1;
      this.state.DATA[index].count = trynum;
      var arr = this.state.DATA;
      this.setState({
        DATA: arr,
      });
    }
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
  changeButton(index) {
    if (this.state.userID === '') {
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
        heightFlat: 77,
      });

      this.insertIntoCart(index);
    }
  }

  changeButton2(index) {
    if (this.state.userID === '') {
      Alert.alert('Please login!');
      this.props.navigation.navigate('Newsignin');
    } else {
      this.state.DATA1[index].buttonView = 'true';
      var arr = [];
      arr = this.state.DATA1;
      this.setState({
        DATA1: arr,
      });
      this.setState({
        buttonView1: true,
        heightFlat: 77,
      });

      this.insertDealtoCart(index);
    }
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

  changeButton3(index) {
    this.state.DATA1[index].buttonView = 'false';
    var arr = [];
    arr = this.state.DATA1;
    this.setState({
      DATA1: arr,
    });
    this.setState({
      buttonView1: true,
      heightFlat: 77,
    });

    this.removeAddtoCartDeal(index);
  }

  async removeAddtoCartDeal(index) {
    let dealIddd = this.state.DATA1[index].deal_Id;
    await fetch(global.address + 'updateIntoAddtoCartDealFN', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        statu: '2',
        deal_Id: dealIddd,
        userID: this.state.userID,
        // statu: '3',
        // deal_Id: '1',
        // userID: '11'
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('This working Well');
        //  console.log("update ..........")
        //     console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message);
      });
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

  handleDrillDown = (index) => {
    this.setState({
      buttonView: true,
    });
  };

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

  async insertDealtoCart(index) {
    // console.log("deal id: "+this.state.DATA1[index].deal_Id)
    // console.log('userID: '+this.state.userID)
    let dealIDD = this.state.DATA1[index].deal_Id;
    await fetch(global.address + 'insertIntoAddToCartDeal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deal_Id: dealIDD,
        userID: this.state.userID,
        orderQty: '1',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('This working Well');
        // console.log("Shops ..........")
        // console.log(responseJson);
      })
      .catch((error) => {
        //Alert.alert('Error', error.message);
      });
  }

  functionCallFN() {
    this.assignUserIdFN();
    this.setState({
      buttonView1: false,
      heightFlat: 10,
      DATA: '',
      indigat: true,
    });

    let shopID = '';

    shopID = this.props.navigation.state.params.shopID;

    //Alert.alert(""+shopID);
    this.getProductByShopId(shopID);
    this.fetchDealsData(shopID);

    for (let i = 0; i < this.state.DATA.length; i++) {
      this.state.DATA[i].buttonView = 'false';
    }
  }

  render() {
    // const { search } = this.state;
    return (
      <View>
        <NavigationEvents onDidFocus={() => this.functionCallFN()} />
        {this.state.indigat == true ? (
          <View style={[styles.container1, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                <ActivityIndicator size="large" color="#0000ff" />
                <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View>
            <View style={styles.container}>
              {/* Search bar view */}
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
              {/* /////////Flatlist View */}

      

              {this.state.showdeals == false ? (
                <FlatList
                  data={this.state.DATA}
                  renderItem={({item, index}) => (
                    // <Item itemname={item.itemname} offpercen={item.offpercen} itemImages={item.itemImages} type={item.type} storageLife={item.storageLife} qty={item.qty} discountPrice={item.discountPrice} currentPrice={item.currentPrice}/>
                    <View>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          width: '98%',
                          marginTop: 5,
                          marginLeft: '1%',
                        }}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          {/* Content View */}
                          <View>
                           
                            <View>
                              <Image
                                style={{
                                  height: 85,
                                  width: 200,
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
                              <View style={{width: '40%'}}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    textDecorationLine: 'line-through',
                                  }}>
                                  Rs.{item.productSalePrice}
                                </Text>
                                <Text
                                  style={{
                                    color: '#e89439',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                  }}>
                                  Rs.{item.discountAmount}
                                </Text>
                              </View>
                              {/* //////////Button View Start////// */}
                             
                            </View>
                          </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <View style={{width: '80%',marginLeft:10}}>
                              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                {item.productName}
                              </Text>
                            </View>

                            <View style={{width: 90}}>
                                {
                                  item.buttonView == 'false' ? (
                                    <View>
                                      <TouchableOpacity
                                        style={{
                                          backgroundColor: 'red',
                                          width: 80,
                                          height: 30,
                                          marginLeft:-30,
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
                                          marginLeft:-30,
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
                             
                                }
                               
                              </View>

                            </View>

                        <View style={{height: 5, width: '100%'}}></View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  style={{marginTop: 10, marginBottom: this.state.heightFlat}}
                />
              ) : (
                <FlatList
                  data={this.state.DATA1}
                  renderItem={({item, index}) => (
                    <View style={{marginTop: '5%'}}>
                      <Image
                        resizeMode="stretch"
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
                        <View style={{width: '50%'}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {item.dealName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              color: 'red',
                            }}>
                            Rs.{item.dealPrice}
                          </Text>
                        </View>

                        {/* <Text style={{ fontSize: 20, color: 'red' }}>
                          & {item.shopDeliveryTime} mins
                </Text> */}

                        {item.buttonView == 'false' ? (
                          <View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: 'red',
                                width: 80,
                                height: 30,
                                marginLeft: '35%',
                                marginTop: 5,
                                justifyContent: 'center',
                                borderRadius: 50,
                              }}
                              onPress={() => this.changeButton2('' + index)}>
                              <Text
                                style={{textAlign: 'center', color: '#fff'}}>
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
                                marginLeft: '35%',
                                marginTop: 5,
                                justifyContent: 'center',
                                borderRadius: 50,
                              }}
                              onPress={() => this.changeButton3('' + index)}>
                              <Text
                                style={{textAlign: 'center', color: '#fff'}}>
                                UNDO
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>

                      {/* <Text style={{ fontSize: 15, color: 'gray', marginLeft: '10%', }}>
                $$$ . {item.description}
            </Text> */}
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              )}

              {this.state.buttonView1 == true ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Third',{
                    RECAR:'keyfor'
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
                    bottom: 12,
                  }}>
                  <Text
                    style={{fontSize: 17, textAlign: 'center', color: '#fff'}}>
                    View Cart
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
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
