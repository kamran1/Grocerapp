import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Header, CheckBox} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';

// const CheckoutDetail = [
//     {
//         id: '1',
//         cardTitle: 'Credit / Debit Cards',
//         cardImage: require('../../images/visapayment.png'),
//         cardName: 'Visa',
//         cardDescription: '***************242',
//         checked: false
//     },

// ]
var DATA = [];
var DATA1 = [];
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedcod: false,
      checkedjazz: false,
      checkedeasy: false,
      currentUserId: global.userid,
      deliveryTime: '',
      addressDelivery: '',
      deliveryFee: '',
      subTotal: '',
      serviceFee: '',
      GST: '',
      discount: '',
      grandTotal: '',
      orderID: '',
      indigat: false,
      //DATA:[],
    };
  }

  componentDidMount() {
    let listOrder = []; 
    listOrder = this.props.navigation.state.params.orderList;
    DATA = listOrder;
    let dealDaata = [];
    dealDaata = this.props.navigation.state.params.deal;

    DATA1 = dealDaata;
    var deliverTime = this.props.navigation.state.params.deliveryExpectedTime;
    var addres = this.props.navigation.state.params.deliveryAdd;
    var fee = this.props.navigation.state.params.delivFee;
    var total = this.props.navigation.state.params.SubTotal;
    var fee1 = this.props.navigation.state.params.serFee;
    var tax = this.props.navigation.state.params.gst;
    var disc = this.props.navigation.state.params.discT;
    var totalG = this.props.navigation.state.params.gTotal;

    this.setState({
      deliveryTime: deliverTime,
      addressDelivery: addres,
      deliveryFee: fee,
      subTotal: total,
      serviceFee: fee1,
      GST: tax,
      discount: disc,
      grandTotal: totalG,
    });
    // this.setState({
    //     DATA : arr,
    // })
    // console.log('The values has been come.....\n');
    // console.log(this.state.DATA);
  }

  check1() {
    this.setState({
      checkedjazz: true,
      checkedeasy: false,
      checkedcod: false,
    });
  }

  check2() {
    this.setState({
      checkedjazz: false,
      checkedeasy: true,
      checkedcod: false,
    });
  }

  check3() {
    this.setState({
      checkedjazz: false,
      checkedeasy: false,
      checkedcod: true,
    });
  }

  check4() {
    if (this.state.checkedcod == false) {
      Alert.alert('Please Select "Check on Delivery"');
    } else if(this.state.GST=='carRent'){

     
        var currentDate = new Date().getDate(); //Current Date
        currentDate = currentDate < 10 ? '0' + currentDate : '' + currentDate;
        var currentMonth = new Date().getMonth() + 1; //Current Month
        currentMonth = currentMonth < 10 ? '0' + currentMonth : '' + currentMonth;
        var currentYear = new Date().getFullYear(); //Current Year
    
        var curentDate = '' + currentYear + '-' + currentMonth + '-' + currentDate;
    
        var hours = new Date().getHours(); //To get the Current Hours
        hours = hours < 10 ? '0' + hours : '' + hours;
        var min = new Date().getMinutes(); //To get the Current Minutes
        min = min < 10 ? '0' + min : '' + min;
        
        var TimeType;
    
        if(hours<=11){
          TimeType='AM'
        }else{
          TimeType='PM'
        }
    
        if(hours>12){
          hours=hours-12;
        }
    
        if(hours==0){
          hours=12;
        }
    
        var currentTime = ''+hours+':'+min+' '+TimeType.toString();
    
         fetch(global.address + 'insertIntoOrderApp', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderCreatedAt: curentDate,
            orderCreatedBy: this.state.currentUserId,
            orderDeliveryExpectedTime: this.state.deliveryTime,
            orderDeliveryAddress: this.state.addressDelivery,
            orderDeliveryFee: this.state.deliveryFee,
            orderSubTotal: this.state.grandTotal,
            orderServiceFee: this.state.serviceFee,
            orderSalesTax: this.state.GST,
            orderTotalDiscount: this.state.discount,
            orderTotalAmount: this.state.grandTotal,
            orderPaymentType: 'Cash on delivery',
            orderStatus: 'Pending',
            orderTime:currentTime
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //   this.setState({
            //     shops : responseJson,
            //   });
            //  console.log('This working Well');
            // console.log("Inert into order ..........")
            //    console.log(responseJson);
    
            this.getIDofOrderByUserID();
          })
          .catch((error) => {
            // Alert.alert('Error', error.message)
          });
      
          this.setState({
            indigat: true,
          });
        
    }
    
    else {
      this.insertIntoOrder();
      this.setState({
        indigat: true,
      });
    }
  }

  async insertIntoOrder() {
    var currentDate = new Date().getDate(); //Current Date
    currentDate = currentDate < 10 ? '0' + currentDate : '' + currentDate;
    var currentMonth = new Date().getMonth() + 1; //Current Month
    currentMonth = currentMonth < 10 ? '0' + currentMonth : '' + currentMonth;
    var currentYear = new Date().getFullYear(); //Current Year

    var curentDate = '' + currentYear + '-' + currentMonth + '-' + currentDate;

    var hours = new Date().getHours(); //To get the Current Hours
    hours = hours < 10 ? '0' + hours : '' + hours;
    var min = new Date().getMinutes(); //To get the Current Minutes
    min = min < 10 ? '0' + min : '' + min;
    
    var TimeType;

    if(hours<=11){
      TimeType='AM'
    }else{
      TimeType='PM'
    }

    if(hours>12){
      hours=hours-12;
    }

    if(hours==0){
      hours=12;
    }

    var currentTime = ''+hours+':'+min+' '+TimeType.toString();

    await fetch(global.address + 'insertIntoOrderApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderCreatedAt: curentDate,
        orderCreatedBy: this.state.currentUserId,
        orderDeliveryExpectedTime: this.state.deliveryTime,
        orderDeliveryAddress: this.state.addressDelivery,
        orderDeliveryFee: this.state.deliveryFee,
        orderSubTotal: this.state.subTotal,
        orderServiceFee: this.state.serviceFee,
        orderSalesTax: this.state.GST,
        orderTotalDiscount: this.state.discount,
        orderTotalAmount: this.state.grandTotal,
        orderPaymentType: 'Cash on delivery',
        orderStatus: 'Pending',
        orderTime:currentTime
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //   this.setState({
        //     shops : responseJson,
        //   });
        //  console.log('This working Well');
        // console.log("Inert into order ..........")
        //    console.log(responseJson);

        this.getIDofOrderByUserID();
      })
      .catch((error) => {
        // Alert.alert('Error', error.message)
      });
  }

  async getIDofOrderByUserID() {
    await fetch(global.address + 'getOrderIDByUserId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentUserId: this.state.currentUserId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //   this.setState({
        //     shops : responseJson,
        //   });

        this.setState({
          orderID: Object.values(responseJson[0]),
        });

        this.insertIntoOrderItems();
      })
      .catch((error) => {
        //Alert.alert('Error', error.message)
      });
  }

  async insertIntoOrderItems() {
    for (let i = 0; i < DATA.length; i++) {
      console.log('terns : ' + i);
      var amount = DATA[i].orderQty * DATA[i].productSalePrice;
      await fetch(global.address + 'insertIntoOrderItemsApp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: DATA[i].productId,
          productQuantity: DATA[i].orderQty,
          productPrice: DATA[i].productSalePrice,
          productAmount: amount,
          productDiscount: DATA[i].productDiscount,
          orderId: this.state.orderID,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //  console.log('This working Well');
          // console.log("Order Items ..........")
          //    console.log(responseJson);
        })
        .catch((error) => {
          // Alert.alert('Error', error.message)
        });
    }

    this.updateAddTocartFN();
  }

  async insertIntoOrderDeals() {
    var currentDate = new Date().getDate(); //Current Date
    currentDate = currentDate < 10 ? '0' + currentDate : '' + currentDate;
    var currentMonth = new Date().getMonth() + 1; //Current Month
    currentMonth = currentMonth < 10 ? '0' + currentMonth : '' + currentMonth;
    var currentYear = new Date().getFullYear(); //Current Year

    var curentDate = '' + currentYear + '-' + currentMonth + '-' + currentDate;

    for (let i = 0; i < DATA1.length; i++) {
      var amount = DATA1[i].dealQty * DATA1[i].dealPrice;
      await fetch(global.address + 'insertIntoOrderDeal', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deal_Id: DATA1[i].deal_Id,
          userId: this.state.currentUserId,
          Qty: DATA1[i].dealQty,
          price: DATA1[i].dealPrice,
          amount: amount,
          dealCreatedAt: curentDate,
          dealDeliveryAddress: this.state.addressDelivery,
          dealDeliveryFee: this.state.deliveryFee,
          dealPaymentType: 'Cash on delivery',
          status: 'Pending',
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //  console.log('This working Well');
          // console.log("Order Deals ..........")
          //    console.log(responseJson);
        })
        .catch((error) => {
          // Alert.alert('Error', error.message)
        });
    }

    this.updateAddTocartDealFN();
  }

  async updateAddTocartDealFN() {
    for (let i = 0; i < DATA1.length; i++) {
      console.log(DATA1[i].addtoCartDeal_Id);
      await fetch(global.address + 'updateIntoAddtoCartDealPending', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: '1',
          addtoCartDeal_Id: DATA1[i].addtoCartDeal_Id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //  console.log('This working Well');
          // console.log("dealOrder Complete ..........")
          //    console.log(responseJson);
        })
        .catch((error) => {
          //Alert.alert('Error', error.message)
        });
    }
    // this.insertIntoOrderDeals();
    // Alert.alert('Order Done Successfully!')
    this.props.navigation.navigate('Fifth');
  }

  async updateAddTocartFN() {
    for (let i = 0; i < DATA.length; i++) {
      console.log(DATA[i].addToCartId);
      await fetch(global.address + 'updateIntoAddtoCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: '1',
          addToCartId: DATA[i].addToCartId,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('This working Well');
          console.log('Order Items ..........');
          console.log(responseJson);
        })
        .catch((error) => {
          //Alert.alert('Error', error.message)
        });
    }
    this.insertIntoOrderDeals();
    // Alert.alert('Order Done Successfully!')
  }

  functionCallFN() {
    let listOrder = [];
    listOrder = this.props.navigation.state.params.orderList;
    DATA = listOrder;
    let dealDaata = [];
    dealDaata = this.props.navigation.state.params.deal;
    DATA1 = dealDaata;
    var deliverTime = this.props.navigation.state.params.deliveryExpectedTime;
    var addres = this.props.navigation.state.params.deliveryAdd;
    var fee = this.props.navigation.state.params.delivFee;
    var total = this.props.navigation.state.params.SubTotal;
    var fee1 = this.props.navigation.state.params.serFee;
    var tax = this.props.navigation.state.params.gst;
    var disc = this.props.navigation.state.params.discT;
    var totalG = this.props.navigation.state.params.gTotal;

    this.setState({
      deliveryTime: deliverTime,
      addressDelivery: addres,
      deliveryFee: fee,
      subTotal: total,
      serviceFee: fee1,
      GST: tax,
      discount: disc,
      grandTotal: totalG,
      indigat: false,
    });
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={() => this.functionCallFN()} />
        {this.state.indigat == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <Text style={{fontSize: 17, color: 'red'}}>
              Order in processing
            </Text>
            <ActivityIndicator size="large" color="red" />
            {/* <ActivityIndicator size="small" color="#00ff00" />
                <ActivityIndicator size="large" color="#0000ff" />
                <ActivityIndicator size="small" color="#00ff00" /> */}
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {/* <Header
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        borderBottomColor: '#EC1E24',
                        borderBottomWidth: 1
                    }}
                    leftComponent={<TouchableOpacity onPress={() => goBack()}><Image style={{ height: 30, width: 30, tintColor: 'black', marginLeft: '10%', marginBottom: 15 }} source={require('../../images/cross.png')}></Image></TouchableOpacity>}
                    centerComponent={{ text: 'Check out', style: { color: '#EC1E24', fontSize: 20, marginBottom: 15, fontFamily: 'Raleway-Bold' } }}
                /> */}

            <ScrollView>
              <View>
                <View style={{flexDirection: 'row', marginTop: '15%'}}>
                  <Image
                    style={{height: 23, width: 23, marginLeft: '6.5%'}}
                    source={require('../../images/firsttick.png')}></Image>

                  <View
                    style={{
                      width: '30%',
                      height: 1,
                      backgroundColor: '#EC1E24',
                      marginTop: '3%',
                      marginHorizontal: '2%',
                    }}></View>

                  <Image
                    style={{height: 23, width: 23}}
                    source={require('../../images/second.png')}></Image>

                  <View
                    style={{
                      width: '30%',
                      height: 1,
                      backgroundColor: '#EC1E24',
                      marginTop: '3%',
                      marginHorizontal: '2%',
                    }}></View>

                  <Image
                    style={{height: 23, width: 23}}
                    source={require('../../images/final3rd.png')}></Image>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Raleway-Bold',
                      color: 'black',
                      marginLeft: '45%',
                      marginTop: '2%',
                    }}>
                    Billing
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Raleway-Bold',
                      color: 'black',
                      marginLeft: '28%',
                      marginTop: '2%',
                    }}>
                    Delivery
                  </Text>
                </View>

                {/* <View style={{ height: 60, marginTop: '10%', width: '80%', borderColor: '#A4A4A4', borderWidth: 1, marginHorizontal: '10%', backgroundColor: 'white', borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row' }}>

                                <Image style={{ height: 35, width: 35, marginTop: '4.5%', marginLeft: '10%' }} source={require('../../images/jazzcash.png')} ></Image>

                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular', color: '#707070', marginTop: '7.5%', marginLeft: '3%' }}>JazzCash</Text>

                                <CheckBox
                                    containerStyle={{
                                        marginLeft: '34%',
                                        marginTop: '3%',
                                    }}
                                    checked={this.state.checkedjazz}
                                    checkedColor='#EC1E24'
                                    uncheckedColor='#A4A4A4'
                                    onPress={() => this.check1()}
                                />

                            </View>

                        </View>

                        <View style={{ height: 60, marginTop: '5%', width: '80%', borderColor: '#A4A4A4', borderWidth: 1, marginHorizontal: '10%', backgroundColor: 'white', borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row' }}>

                                <Image style={{ height: 35, width: 35, marginTop: '4.5%', marginLeft: '10%' }} source={require('../../images/easypaisa.png')} ></Image>

                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular', color: '#707070', marginTop: '7.5%', marginLeft: '3%' }}>EasyPaisa</Text>

                                <CheckBox
                                    containerStyle={{
                                        marginLeft: '33%',
                                        marginTop: '3%',
                                    }}
                                    checked={this.state.checkedeasy}
                                    checkedColor='#EC1E24'
                                    uncheckedColor='#A4A4A4'
                                    onPress={() => this.check2()}
                                />

                            </View>

                        </View> */}

                {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                            <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginHorizontal: '2%', marginVertical: 28 }}></View>

                            <Text style={{ fontSize: 15, fontFamily: 'Raleway-Bold', color: 'black', marginVertical: 20 }}> Or </Text>

                            <View style={{ width: '30%', height: 1, backgroundColor: '#EC1E24', marginHorizontal: '2%', marginVertical: 28 }}></View>

                        </View> */}

                <View
                  style={{
                    height: 60,
                    width: '80%',
                    borderColor: '#A4A4A4',
                    borderWidth: 1,
                    marginHorizontal: '10%',
                    marginTop: '35%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        height: 35,
                        width: 35,
                        marginTop: '4.5%',
                        marginLeft: '10%',
                      }}
                      source={require('../../images/cod.png')}></Image>

                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Raleway-Regular',
                        color: '#707070',
                        marginTop: '7.5%',
                        marginLeft: '3%',
                      }}>
                      Cash on Delivery(COD)
                    </Text>

                    <CheckBox
                      containerStyle={{
                        marginLeft: '6.5%',
                        marginTop: '3%',
                      }}
                      checked={this.state.checkedcod}
                      checkedColor="#EC1E24"
                      uncheckedColor="#A4A4A4"
                      onPress={() => this.check3()}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.check4()}
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
                    Order Done!
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
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    //flexDirection: "row",
    //justifyContent: "space-around",
    padding: 2,
  },
});
