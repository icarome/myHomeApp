/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { Container } from './styles';
 import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
 import TcpSocket from 'react-native-tcp-socket';
 // Create socket
 class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.isConnected = false;
    this.shownResponse = "Desconectado\n"
    this.backcolor = "red";
    this.receiveData = this.receiveData.bind(this);
    this.updateTeste = this.updateTeste.bind(this)
    this.buttonName = "Conectar";
    this.client;
    this.host = "10.0.0.35"
  }
  
  updateTeste(data){
    console.log('message was received', this.shownResponse);
    this.shownResponse += data.toString();
    this.shownResponse += '\n';
    this.setState({});
  }
  receiveData(){
    if(this.isConnected == true){
      this.client.destroy();
      this.isConnected = false;
      this.backcolor = "red";
      this.buttonName = 'Conectar'
      this.shownResponse += "Desconectado\n"
      this.setState({})
      return;
    }
    this.shownResponse = "";
    const options = {
      host: this.host,
      port: 20000,
    }
    this.client = TcpSocket.createConnection(options, () => {
      // Write on the socket
      this.client.write('*99*1##');
      this.backcolor = "green";
      this.buttonName = "Desconectar";
      this.isConnected = true;
    
      // Close socket
      //client.destroy();
    });
    //client.on('data', this.updateTeste)
    this.client.on('data', function(data) {
      response = data.toString();
      let response = response.split("##");
      for(i = 0; i < response.length-1; i++){
        console.log('message was received', response[i]);
        this.updateTeste(response[i]+"##");
      }
      
    }
    .bind(this)
    );
    
    this.client.on('error', function(error) {
      console.log(error);
      this.isConnected = false;
      this.backcolor = "red";
      this.buttonName = "Conectar";
    });
    
    this.client.on('close', function(){
      console.log('Connection closed!');
      this.isConnected = false;
      this.backcolor = "red";
      this.buttonName = 'Conectar'
    });
    this.isConnected = true;
  }
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "space-evenly", backgroundColor: this.backcolor }}>
        <ScrollView style={{flexDirection: 'column', marginHorizontal: 2, width: '100%', height: 100, }} ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          <Text style={{ fontSize: 18, color: 'white', width: '100%'}}>{this.shownResponse}</Text>
        </ScrollView>
         <View style={{  height: 300, alignItems: 'center', alignContent: 'baseline'}}>
            <Pressable style={{position: 'relative', top: 50, left: 0, justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32, elevation: 3, backgroundColor: '#03cafc',}} onPress={this.receiveData}>
              <Text style={{ fontSize: 18, color: 'white', width: '100%'}}>{this.buttonName}</Text>
            </Pressable>

          </View>
       </SafeAreaView>
    )
  }
}

 export default function App(){

  return (
      <Results></Results>
  );
  //  return (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //   <Text style={{ fontSize: 32, color: 'white'}}>{this.text}</Text>
  // </View>
  //  )
 }

 