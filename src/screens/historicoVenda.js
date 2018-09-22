import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Button, Icon, View, Drawer } from 'native-base';
import SideBar from '../sidebar';
import DropdownMenu from 'react-native-dropdown-menu';
import firebase from 'firebase';


export default class HistoricoVenda extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database().ref('/vendas/');

    this.state = {
      text: '',
      vendas: '',
      itemVenda: ''
    };


  }

  componentDidMount() {
    let itens = [];
    let horarios = [];
    horarios['vendas'] = [];
    this.database.on('value', snapshot => {
      snapshot.forEach(function (childSnapshot) {
        let item = [];
        item['vendas'] = new Array;
        item['data'] = childSnapshot.key;
        childSnapshot.forEach(function (childOfChild) {
          item['vendas'].push(childOfChild.val());
        })
        itens.push(item);
      })
      this.setState({vendas:itens});
    });
  }






  render() {
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    var mes = [["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]];
    //this.setState({text: mes});
    return (
      <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.props.navigation} />}
                onClose={() => this.closeDrawer} >
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
        
            <View>
              <FlatList
                data={this.state.vendas}
                renderItem={({ item }) => (this.renderRow(item))}
                keyExtractor={(item, index) => item.data}
              />
            </View>

          
       


      </Container>
      </Drawer>
    );

  }

  renderRow(venda) {
    //console.log(venda.vendas);


    return (
      <View>
        <View>
          <Text style={styles.data}>{venda.data.replace("-", "/").replace("-", "/")}</Text>
          {venda.vendas.map((item, index) => {
            return (
              <View key={index} style={styles.venda}>
                <Text style={styles.titleVenda}>{item.obs} - {item.hora}</Text>
                <Text style={styles.descricaoVenda}>Meio Kg: {item.meiokg} - Um Kg: {item.umkg}</Text>

              </View>
            )
          })}
        </View>
      </View>
    );
  }

  renderVendas(v) {
    v.forEach(function (filho) {
      //console.log(filho.obs);
      return (
        <View style={{ flex: 1 }}>
          <Text>{filho.obs}</Text>

        </View>
      )
      //console.log(this.state.itemVenda);
    })



  }

}

const styles = StyleSheet.create({
  row: {

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  data: {
    fontSize: 22,
    backgroundColor: "#98FB98"
  },
  venda:{
    borderBottomColor: "#D3D3D3",
    borderBottomWidth:1
  },
  titleVenda:{
    fontSize:18,
    paddingLeft: 20
  },
  descricaoVenda:{
    paddingLeft: 35,
    color: "#696969"
  }
});