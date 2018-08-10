import React from "react";
import { Platform,YellowBox } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import { Drawer } from 'native-base';
import SideBar from '../sidebar';


YellowBox.ignoreWarnings(
    [
      'Warning: isMounted(...) is deprecated',
      'Module RCTImageLoader'
    ]
  );


export default class SaidaCaixa extends React.Component {
  render() {
    closeDrawer = () => {
        this.drawer._root.close()
      };
    openDrawer = () => {
        this.drawer._root.open()
      };
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
            <Title>Saída de Caixa</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>Teste Saida</Text>
        </Content>
      </Container>
      </Drawer>
    );
  }
}