import React, { Component } from "react";
import EntradaCaixa from "./screens/entradaCaixa";
import SaidaCaixa from "./screens/saidaCaixa";
import NovaVendaScreen from './screens/novaVenda';
import HistoricoVendaScreen from './screens/historicoVenda';
import VendasPendentesScreen from './screens/vendasPendentes'; 
import FluxoCaixaScreen from './screens/fluxoCaixa';
import EstoqueScreen from './screens/estoque';
//import SideBar from "./sidebar";
import { createStackNavigator } from "react-navigation";
import firebase from 'firebase';

var config = {
    apiKey: "API_KEY",
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

const RootStack = createStackNavigator({
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
  },
  VendasPendentes: {
      screen: VendasPendentesScreen
  },
  FluxoCaixa:{
      screen: FluxoCaixaScreen
  },
  Estoque: {
      screen: EstoqueScreen
  }
},
{
  initialRouteName: 'Entrada',
  navigationOptions: {
      header: null,

  }
});

export default RootStack;
