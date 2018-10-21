import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Header,
  Left,
  Right
} from "native-base";
import App from '../App.js';

//import { DrawerNavigator } from "react-navigation";
//import GLOBAL from './screens/global';
const routes = [
  {
    menu: "Entrada",
    texto: "Administrar Vendas",
    icon: "monetization-on"
  },
  {
    menu: "HistoricoVendas",
    texto: "Histórico",
    icon: "history"
  },
  {
    menu: "Estoque",
    texto: "Estoque",
    icon: "view-module"
  },

];
export default class SideBar extends React.Component {


  constructor(props) {
    super(props);
  }



  render() {
    //console.log(this.props.navigation);
    return (
      <Container>

        <Content style={{ backgroundColor: "#FFF" }} >
          <Image
            source={require('../assets/logo_cv_jpeg_antigo.png')}
            style={{
              height: 250,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 250 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.push(data.menu)}
                >

                  <Icon type="MaterialIcons" name={data.icon} />
                  <Text>{data.texto}</Text>
                  <Right></Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}