import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const io = require('socket.io-client');

class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
  };
  componentDidMount() {
    // INSTRUCTION:
    // or replace with your local ngrok url, eg: https://brent123.ngrok.io
    // start ngrok with ngrok http 3000 --subdomain=brent123
    // where the subdomain is whatever subdomain you want
    const socket = io('https://socket-io-expo-backend-dtyxsdtzxb.now.sh', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('ping', data => {
      this.setState(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text>
        {this.state.data &&
          <Text>
            ping response: {this.state.data}
          </Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
