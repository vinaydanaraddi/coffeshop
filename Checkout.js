/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Image, FlatList, View } from "react-native";

import {
  Container,
  Text,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Left,
  Button
} from "native-base";

export default class Checkout extends Component {
  coffee_items = this.props.navigation.getParam('itemSelected', []);

  constructor(props) {
    super(props);
    
  }

  componentWillMount(){
    this.state = {
        totalAmount : this.getTotal(),
        items : this.coffee_items
    };
  }

  onRemoved(item, currentTotalAmount) {
      if(currentTotalAmount === 0){
        this.props.navigation.navigate('HomeScreen');
      }else{
        this.setState({
            totalAmount : currentTotalAmount - item.price ,
            item : this.getUpdatedList(item)
         });
      }
    
  }

  getUpdatedList(item){
    for( var i = 0; i < this.coffee_items.length; i++){ 
        if ( this.coffee_items[i].key === item.key) {
            this.coffee_items.splice(i, 1); 
        }
    }
    return this.coffee_items;
  }



  getTotal(){
    var total = 0;
    this.coffee_items.forEach(function(item) {
        total = total + item.price;
    });

    return total;
  }
  render() {
      this.getTotal();
    return (
      <Container>
        <Image
          style={{ height: 250, resizeMode: "stretch" }}
          source={{
            uri:
              "http://wallpaperswide.com/download/coffee_break-wallpaper-960x600.jpg"
          }}
        />
        {}
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://loremflickr.com/320/240/coffee,latte,cappuccino"
                  }}
                />
              </Left>
              <Body>
                <Text>{item.item}</Text>
                <Text note>Price : {item.price}</Text>
              </Body>
              <Right>
                <View flexDirection="row">
                  <Button
                    rounded
                    bordered
                    dark
                    style={{
                      alignSelf: "flex-end",
                      alignText: "center",
                      marginRight: 5
                    }}
                    onPress={() => this.onRemoved(item, this.state.totalAmount)}
                  >
                    <Text style={{ alignSelf: "center" }}>-</Text>
                  </Button>
                </View>
              </Right>
            </ListItem>
          )}
        />

        <Button
          iconLeft
          rounded
          bordered
          dark
          style={{
           marginBottom:20,
           marginEnd:15,
            marginTop: 10,
            marginRight: 15
          }}
        >
          <Icon name="cash" />
          <Text>{ "CHECKOUT $" + this.state.totalAmount}</Text>
        </Button>
      </Container>
    );
  }
}
