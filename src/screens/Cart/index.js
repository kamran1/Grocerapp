import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {YellowBox} from 'react-native';
import {NavigationEvents} from 'react-navigation';
//import { BackHandler } from 'react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

// const DATA1 = [
//     {
//         id: '1',
//         itemname: 'Washingon Apple',
//         itemprice: '200',
//         count: '12',

//     },
//     {
//         id: '2',
//         itemname: 'Orange',
//         itemprice: '120',
//         count: '4',

//     },

// ];

var sutotalvar = 0;
var grandtotalvar = 0;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      multivalue: 952,
      DATA: [],
      DATA1: [],
      userID: global.userid,
      subTotal: 0,
      discount: 0,
      serviceFee: 0,
      tax: 0,
      deliveryFee: 0,
      deliveryTime: 45,
      grandTotal: 0,
      deliveryAddress: '',
      indigat: true,
      subTotal1: '',
      grandTotal1: '',
      finalSubTotal: '',
      finalGrandTotal: '',
      checkEmpty: '',
      checkEmpty1: '',
      carIDState:'',
    };
  }

  componentDidMount() {
    // this.setState({
    //     DATA: DATA1,
    // });
    //this.getDeliveryTime();
   let Carid = this.props.navigation.state.params.RECAR;
    this.setState({
      carIDState:Carid
    })

    console.log('compnents basic','basic');

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('compnents other','other');
    }); 

  }

  assignUserIdFN() {
    this.setState({
      userID: global.userid,
    });
    //this.getAddToCart();
  }

  async getAddToCart() {
    // Alert.alert(""+this.state.userID)
    await fetch(global.address + 'getaddToCartByUserId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentUserId: this.state.userID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == '') {
          this.setState({
            checkEmpty: 0,
          });
        }

        this.setState({
          DATA: responseJson,
          indigat: false,
        });

        this.getAddToCartDeal();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  //get data from addto cart deal

  async getAddToCartDeal() {
    // Alert.alert(""+this.state.userID)
    let Carid = this.props.navigation.state.params.RECAR;
    this.setState({
      carIDState:Carid
    })
    await fetch(global.address + 'getaddToCartDealByUserId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentUserId: this.state.userID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('aaaa....aaaa');
        console.log('aaaa.Arman..aaaa');
        console.log(responseJson);
        if (responseJson == '' && this.state.checkEmpty === 0) {
          this.setState({
            deliveryFee: 0,
          });
        }
        this.setState({
          DATA1: responseJson,
          //indigat: false,
        });

        this.caculationFN();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  async updateAddTocartFN(index) {
    await fetch(global.address + 'updateIntoAddtoCart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '2',
        addToCartId: this.state.DATA[index].addToCartId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.getAddToCart();
        this.getDeliveryTime();
      })
      .catch((error) => {
        // Alert.alert('Error', error.message)
      });
  }

  async updateAddTocartDealFN(index) {
    await fetch(global.address + 'updateIntoAddtoCartDeal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '2',
        addtoCartDeal_Id: this.state.DATA1[index].addtoCartDeal_Id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.getAddToCart();
        this.getDeliveryTime();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  async getDeliveryTime() {
    let Carid = this.props.navigation.state.params.RECAR;
    this.setState({
      carIDState:Carid
    })
    await fetch(global.address + 'getAdminforDeliveryTime', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminId: '1',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].adminEmail);
        if(this.state.carIDState=='keyfor'){
          this.setState({
            deliveryFee: 0,
            deliveryTime: responseJson[0].deliveryTime,
          });
        }else{
        this.setState({
          deliveryFee: responseJson[0].deliveryFee,
          deliveryTime: responseJson[0].deliveryTime,
        });
      }

        this.getAddToCart();
      })
      .catch((error) => {
        // Alert.alert('Error', error.message)
      });
  }

  caculationFN() {
    // console.log('Loop start.........AA')
    var totalSum = 0;
    var totalDisc = 0;
    var feeServeice = 0;
    var SaleTax = 0;
    var totalGrand = 0;
    for (let i = 0; i < this.state.DATA.length; i++) {
      if (this.state.DATA[i].productSalePrice !== 'Dynamic') {
        // this.state.DATA[i].productSalePrice = 0;
        // var arr = []
        // arr = this.state.DATA;
        // this.setState({
        //   DATA: arr,
        // })

        // console.log(i+".."+this.state.DATA[i].productSalePrice)

        var total =
          this.state.DATA[i].orderQty * this.state.DATA[i].productSalePrice;
        totalSum = parseFloat(totalSum) + parseFloat(total);

        //calculating Discount
        var disc =
          (parseFloat(this.state.DATA[i].productSalePrice) *
            parseFloat(this.state.DATA[i].productDiscount)) /
          100;
        disc = parseFloat(disc) * parseFloat(this.state.DATA[i].orderQty);
        totalDisc = parseFloat(totalDisc) + parseFloat(disc);
      }
    }
    //console.log('Service Fee = '+feeServeice);
    totalGrand = parseFloat(totalSum) + parseFloat(this.state.deliveryFee);
    this.setState({
      subTotal: totalSum,
      discount: totalDisc,
      //serviceFee: feeServeice,
      //tax : SaleTax,
      grandTotal: totalGrand,
    });
    //Alert.alert(''+this.state.subTotal);

    this.caculationFNDeal(totalSum, totalGrand);

    // console.log("Discount = "+parseFloat(this.state.discount));
  }

  caculationFNDeal(totalSum1, totalGrand1) {
    // console.log('Loop start.........AA')
    var totalSum = 0;
    var totalDisc = 0;
    var feeServeice = 0;
    var SaleTax = 0;
    var totalGrand = 0;
    for (let i = 0; i < this.state.DATA1.length; i++) {
      var total = this.state.DATA1[i].dealQty * this.state.DATA1[i].dealPrice;
      totalSum = parseFloat(totalSum) + parseFloat(total);

      //calculating Discount
      // var disc = (parseFloat(this.state.DATA1[i].dealPrice) * parseFloat(this.state.DATA1[i].productDiscount)) / 100;
      // disc = parseFloat(disc) * parseFloat(this.state.DATA1[i].dealQty);
      // totalDisc = parseFloat(totalDisc) + parseFloat(disc);
    }
    //console.log('Service Fee = '+feeServeice);
    totalGrand = parseFloat(totalSum);
    this.setState({
      subTotal1: totalSum,
      // discount1: totalDisc,
      //serviceFee: feeServeice,
      //tax : SaleTax,
      grandTotal1: totalGrand,
    });

    sutotalvar = parseFloat(totalSum1) + parseFloat(this.state.subTotal1);
    grandtotalvar = parseFloat(totalGrand1) + parseFloat(totalGrand);
    this.setState({
      finalSubTotal: sutotalvar,
      finalGrandTotal: grandtotalvar,
    });

    let tempp = this.state.finalSubTotal;
    // console.log("Discount = "+parseFloat(this.state.discount));
    //this.finalCalculation();
  }

  add(index) {
    // Alert.alert(''+index);
    let countAdd = this.state.DATA[index].orderQty;
    countAdd = parseInt(countAdd) + 1;
    this.state.DATA[index].orderQty = countAdd;

    var arr = this.state.DATA;
    this.setState({
      DATA: arr,
    });

    this.caculationFN();
  }

  add1(index) {
    let countAdd = this.state.DATA1[index].dealQty;

    countAdd = parseInt(countAdd) + 1;

    this.state.DATA1[index].dealQty = countAdd;
    // Alert.alert(''+ this.state.DATA1[index].dealQty);
    var arr = this.state.DATA1;
    this.setState({
      DATA1: arr,
    });

    this.caculationFN();
  }

  subtract(index) {
    if (this.state.DATA[index].orderQty <= 0) {
      this.state.DATA[index].orderQty == 0;
    } else {
      var trynum = this.state.DATA[index].orderQty;
      trynum = trynum - 1;
      this.state.DATA[index].orderQty = trynum;
      var arr = this.state.DATA;
      this.setState({
        DATA: arr,
      });
    }

    this.caculationFN();
  }

  subtract1(index) {
    if (this.state.DATA1[index].dealQty <= 0) {
      this.state.DATA1[index].dealQty == 0;
    } else {
      var trynum = this.state.DATA1[index].dealQty;
      trynum = trynum - 1;
      this.state.DATA1[index].dealQty = trynum;
      var arr = this.state.DATA1;
      this.setState({
        DATA1: arr,
      });
    }

    this.caculationFN();
  }

  fuctionCallFN() {
    this.setState({
      indigat: true,
    });
    this.getDeliveryTime();
    //this.getAddToCart();
    this.assignUserIdFN();
  }

  checkAddress() {
    if (this.state.deliveryAddress == '') {
      Alert.alert('Enter your Address');
    } else {
      this.props.navigation.navigate('Fourth', {
        orderList: this.state.DATA,
        deal: this.state.DATA1,
        deliveryExpectedTime: this.state.deliveryTime,
        deliveryAdd: this.state.deliveryAddress,
        delivFee: this.state.deliveryFee,
        SubTotal: this.state.subTotal,
        serFee: this.state.serviceFee,
        gst: this.state.tax,
        discT: this.state.discount,
        gTotal: this.state.grandTotal,
      });
    }
  }

  render() {
      const {carIDState}=this.state;
    return (
      <View>
        <NavigationEvents onDidFocus={() => this.fuctionCallFN()} />
        {this.state.indigat == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                <ActivityIndicator size="large" color="#0000ff" />
                <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View>
            <ScrollView>
              <View style={{marginLeft: 20, width: '90%'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10}}>
                  PhataFutt Delivery
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={{color: 'red', fontSize: 18}}>View Menu</Text>
                </TouchableOpacity>
                {/* /////Order Flate List//////// */}

                <FlatList
                  // data={DATA}
                  data={this.state.DATA}
                  renderItem={({item, index}) => (
                    <View>
                      <View>
                        <View
                          style={{
                            height: 100,
                            backgroundColor: '',
                            borderBottomColor: '#888583',
                            borderBottomWidth: 0.5,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{width: 220, justifyContent: 'center'}}>
                              <Text style={{fontSize: 19}}>
                                {item.productName}
                              </Text>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  justifyContent: 'flex-end',
                                  fontSize: 19,
                                }}>
                                Rs.{item.orderQty * item.productSalePrice}
                              </Text>
                            </View>
                          </View>

                          {/* //////////test */}
                          <View style={{marginTop: 15, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                  width: '25%',
                                  alignItems: 'center',
                                  borderRadius: 25,
                                  borderWidth: 0.3,
                                  marginBottom: '1%',
                                }}>
                                <TouchableOpacity
                                  style={{}}
                                  style={styles.button}
                                  onPress={() => this.subtract('' + index)}
                                  // onPress={window.index.add()}
                                >
                                  <Text
                                    style={{fontWeight: 'bold', fontSize: 22}}>
                                    {' '}
                                    -{' '}
                                  </Text>
                                </TouchableOpacity>
                                <Text style={[styles.countText]}>
                                  {item.orderQty}
                                </Text>
                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this.add('' + index)}>
                                  <Text
                                    style={{fontWeight: 'bold', fontSize: 22}}>
                                    {' '}
                                    +{' '}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{width: '50%'}}></View>

                              <TouchableOpacity
                                onPress={() =>
                                  this.updateAddTocartFN('' + index)
                                }>
                                <View
                                  style={{
                                    alignContent: 'center',
                                    height: 24,
                                    width: 72,
                                    borderRadius: 9,
                                    backgroundColor: 'red',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      alignSelf: 'center',
                                    }}>
                                    {' '}
                                    Remove{' '}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* ////XXXXXXXXXXXXXXX */}
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  style={{marginTop: 20, marginBottom: 0}}
                />

                {/* Flat List For Deal */}

                <FlatList
                  // data={DATA}
                  data={this.state.DATA1}
                  renderItem={({item, index}) => (
                    <View>
                      <View>
                        <View
                          style={{
                            height: 100,
                            backgroundColor: '',
                            borderBottomColor: '#888583',
                            borderBottomWidth: 0.5,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{width: 220, justifyContent: 'center'}}>
                              <Text style={{fontSize: 19}}>
                                {item.dealName}
                              </Text>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  justifyContent: 'flex-end',
                                  fontSize: 19,
                                }}>
                                Rs.{item.dealQty * item.dealPrice}
                              </Text>
                            </View>
                          </View>

                          {/* //////////test */}
                          <View style={{marginTop: 15, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                  width: '25%',
                                  alignItems: 'center',
                                  borderRadius: 25,
                                  borderWidth: 0.3,
                                  marginBottom: '1%',
                                }}>
                                <TouchableOpacity
                                  style={{}}
                                  style={styles.button}
                                  onPress={() => this.subtract1('' + index)}
                                  // onPress={window.index.add()}
                                >
                                  <Text
                                    style={{fontWeight: 'bold', fontSize: 22}}>
                                    {' '}
                                    -{' '}
                                  </Text>
                                </TouchableOpacity>
                                <Text style={[styles.count]}>
                                  {item.dealQty}
                                </Text>
                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this.add1('' + index)}>
                                  <Text
                                    style={{fontWeight: 'bold', fontSize: 22}}>
                                    {' '}
                                    +{' '}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{width: '50%'}}></View>

                              <TouchableOpacity
                                onPress={() =>
                                  this.updateAddTocartDealFN('' + index)
                                }>
                                <View
                                  style={{
                                    alignContent: 'center',
                                    height: 24,
                                    width: 72,
                                    borderRadius: 9,
                                    backgroundColor: 'red',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      alignSelf: 'center',
                                    }}>
                                    {' '}
                                    Remove{' '}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* ////XXXXXXXXXXXXXXX */}
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  style={{marginTop: 20, marginBottom: 10}}
                />
                {/* Bottom Area */}
                <View
                  style={{
                    marginTop: 20,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#888583',
                    paddingBottom: 40,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.subtotalAreaText}>Subtotal</Text>
                    <Text style={styles.subtotalAreaText}>Rs.{sutotalvar}</Text>
                  </View>
                  {this.state.carIDState=='keyfor'?
                    null
                    :
                
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.subtotalAreaText}>Delivery Fee</Text>
                    <Text style={styles.subtotalAreaText}>
                      Rs.{this.state.deliveryFee}
                    </Text>
                  </View>
  }

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={styles.subtotalAreaText}>Discount</Text>
                                <Text style={styles.subtotalAreaText}>Rs.{this.state.discount}</Text>
                            </View> */}

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={styles.subtotalAreaText}>Service Fee</Text>
                                <Text style={styles.subtotalAreaText}>Rs.{this.state.serviceFee}</Text>
                            </View> */}

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={styles.subtotalAreaText}>Sales Tax</Text>
                                <Text style={styles.subtotalAreaText}>Rs.{this.state.tax}</Text>
                            </View> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                      Total
                    </Text>
                    <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                      Rs.{grandtotalvar}
                    </Text>
                  </View>
                </View>
                {this.state.carIDState=='keyfor'?
                <View style={{marginTop: 20, marginBottom: 30}}>
                  <View style={styles.inputview}>
                    <Text style={styles.deliveryAdressSection}>
                      Address
                    </Text>
                    <TextInput
                      style={styles.inputfiled}
                      placeholder="Enter Address"
                      onChangeText={(TextInputValue2) =>
                        this.setState({deliveryAddress: TextInputValue2})
                      }
                    />
                  </View>
               
                </View>
                :
                <View style={{marginTop: 20, marginBottom: 30}}>
                <View style={styles.inputview}>
                  <Text style={styles.deliveryAdressSection}>
                    Delivery Address
                  </Text>
                  <TextInput
                    style={styles.inputfiled}
                    placeholder="Enter Delivery Address"
                    onChangeText={(TextInputValue2) =>
                      this.setState({deliveryAddress: TextInputValue2})
                    }
                  />
                </View>
             
              </View>
                
  }

                <TouchableOpacity
                  onPress={() => this.checkAddress()}
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
                      color: 'white',
                      alignSelf: 'center',
                      marginVertical: 12,
                    }}>
                    Proceed to checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtotalAreaText: {
    fontSize: 19,
  },
  deliveryAdressSection: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  inputfiled: {
    width: '100%',
    height: 45,
    borderWidth: 0.5,
    borderColor: '#888583',
    marginTop: 5,
    borderRadius: 40,
    paddingLeft: 20,
  },
  inputview: {
    marginTop: 10,
  },
  container: {
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
