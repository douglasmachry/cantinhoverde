//import React, { Component } from "react";
import EntradaCaixa from "./screens/entradaCaixa";
import SaidaCaixa from "./screens/saidaCaixa";
import NovaVendaScreen from './screens/novaVenda';
import HistoricoVendaScreen from './screens/historicoVenda';
import { Root } from "native-base";
//import SideBar from "./sidebar";
import { createStackNavigator } from "react-navigation";
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCAvSdtSwI5e6GvqxfsMISwuCxH0lIrx3w",
    authDomain: "controlevendas-257fc.firebaseapp.com",
    databaseURL: "https://controlevendas-257fc.firebaseio.com",
    projectId: "controlevendas-257fc",
    storageBucket: "controlevendas-257fc.appspot.com",
    messagingSenderId: "373568123697"
};
try{
    firebase.initializeApp(config);
    //console.log(db);
}catch(error){
    console.error(error);
    
}


//vendas = db.CollectionReference;

const rootStack = createStackNavigator({
  Entrada: {
      screen: EntradaCaixa
  },
  Saida: {
      screen: SaidaCaixa
  },
  NovaVenda: {
      screen: NovaVendaScreen
  },
  HistoricoVendas: {
      screen: HistoricoVendaScreen
  }
},
{
  initialRouteName: 'HistoricoVendas',
  navigationOptions: {
      header: null,

  }
});

export default rootStack;