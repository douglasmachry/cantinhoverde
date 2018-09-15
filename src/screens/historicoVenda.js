import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, DatePicker, Left, Text, Body, Right, Title, Button, Icon, View, List, ListItem } from 'native-base';
import DropdownMenu from 'react-native-dropdown-menu';
import firebase from 'firebase';
import { func } from 'prop-types';

export default class HistoricoVenda extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database().ref('/vendas/');

    this.state = {
      text: '',
      vendas: ''
    };


  }

  componentDidMount() {
    let itens = [];
    this.database.on('value', snapshot => {
      //console.log(snapshot.val());
      snapshot.forEach(function (childSnapshot) {
        let item = [];
        item['data'] = childSnapshot.key;
        childSnapshot.forEach(function(childOfChild){
          let horarios = childOfChild.val();
          horarios['hora'] = childOfChild.key;
          item.push(horarios);
        })
        //item['hora'] = childSnapshot.data.key;
        itens.push(item);
      })
      this.state.vendas = itens;

    });
  }






  render() {
    //console.log(this.state.vendas);
    var data = [["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]];
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Histórico de Vendas</Title>
          </Body>

        </Header>
        <View style={{ flex: 1 }}>
          <DropdownMenu
            style={{ flex: 1 }}
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'green'}
            // arrowImg={}      
            // checkImage={}   
            // optionTextStyle={{color: '#333333'}}
            // titleStyle={{color: '#333333'}} 
            // maxHeight={300} 
            handler={(selection, row) => this.setState({ text: data[selection][row] })}
            data={data}
          >
            <View>
              <Text>TESTE</Text>
              <FlatList
                data={this.state.vendas}
                renderItem={({ item }) => this.renderRow(item)}
                keyExtractor={(item, index) => item.data}
              />
            </View>

          </DropdownMenu>
        </View>


      </Container>
    );

  }

  renderRow(venda) {
    console.log(venda);
    //let vendasDoDia = '';
    
    return (
      <TouchableOpacity style={styles.row}>
        <View style={styles.row}>
          <Text>{venda.data}</Text>
          {this.renderVendas(venda)}
        </View>
        
      </TouchableOpacity>
    );
  }

  renderVendas(v){
    v.forEach(function(filho){
      console.log(filho.obs);
      return(
        <View>
          <Text style={styles.obs}>{filho.obs}</Text>
          <Text>{filho.hora}</Text>
          <Text>{filho.umkg}</Text>
          <Text>{filho.meiokg}</Text>
        </View>
      )

    })
    
  }

}

const styles = StyleSheet.create({
  row: {

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  obs: {
    color: '#555',
    fontSize: 12
  }
});