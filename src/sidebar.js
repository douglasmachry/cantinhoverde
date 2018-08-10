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
//import { DrawerNavigator } from "react-navigation";
import GLOBAL from './screens/global';
const routes = [
    {
        menu: "Entrada",
        texto: "Entrada de Caixa",
        icon: "monetization-on"
    },
    {
        menu: "Saida",
        texto: "Saída de Caixa",
        icon: "money-off"
        
    }
];
export default class SideBar extends React.Component {
   

    constructor(props){
        super(props);
    }
  render() {
    return (
      <Container>
          
        <Content style={{backgroundColor:"#FFF"}} >
          <Image
            source={require('./assets/logo_cv_jpeg_antigo.png')}
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
                  onPress={() => this.props.navigator.navigate(data.menu)}
                >
                <Left>
                
                </Left>
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