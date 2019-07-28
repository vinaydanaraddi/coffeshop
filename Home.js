/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Image, FlatList, View } from "react-native";
import shortid from 'shortid';

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

export default class Home extends Component {
   coffee_items = [
    { key: shortid.generate(), item: "Latte", price: 10 },
    { key: shortid.generate(), item: "Coffee", price: 15 },
    { key: shortid.generate(), item: "Cappucino", price: 23 },
    { key: shortid.generate(), item: "Vegan Shake", price: 53 }
  ];

  
  
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { noOfItemInCard: 0 ,
      selected_items : []
    
    };
  }

  onRemoved(item) {
    this.state.selected_items.pop(item);
    this.setState({
      noOfItemInCard: this.state.selected_items.length
    });
  }

  navigateToCheckout(){
    this.props.navigation.navigate('CheckoutScreen', {
      'itemSelected' : this.state.selected_items
    });
  }

  onAdded(item) {
    item.key = shortid.generate();
    this.state.selected_items.push(item);
    this.setState({ noOfItemInCard: this.state.selected_items.length });
  }

  render() {
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
        <Button
          iconLeft
          rounded
          bordered
          dark
          onPress={()=> this.navigateToCheckout()}
          style={{
            width: 80,
            alignSelf: "flex-end",
            marginTop: 10,
            marginRight: 5
          }}
        >
          <Icon name="cart" />
          <Text>{this.state.noOfItemInCard}</Text>
        </Button>
        <FlatList
          data={this.coffee_items}
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
                <Text note>Price : ${item.price}</Text>
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
                    onPress={() => this.onRemoved(item)}
                  >
                    <Text style={{ alignSelf: "center" }}>-</Text>
                  </Button>
                  <Button
                    rounded
                    bordered
                    dark
                    style={{
                      alignSelf: "flex-end",
                      alignText: "center",
                      marginRight: 5
                    }}
                    onPress={() => this.onAdded(item)}
                  >
                    <Text style={{ alignSelf: "center" }}>+</Text>
                  </Button>
                </View>
              </Right>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}
