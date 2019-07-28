import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Home';

import Checkout from './Checkout';

const NavStack = createStackNavigator({
    HomeScreen: { 
        screen: Home,
    },
    CheckoutScreen: { 
      screen: Checkout,
  }
});

const App = createAppContainer(NavStack);

export default App;