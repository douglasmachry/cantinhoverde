import React from "react";
import { Platform, YellowBox } from "react-native";
import {
  Header,
  Icon,
  Body,
  Title,
  Button,
  Text,
  Container,
  Form,
  Input,
  Label,
  Content,
  Item,
  Col,
  Left,
  Radio,
  Right,
  TabHeading
} from "native-base";
import { Drawer } from 'native-base';
import SideBar from './sidebar';
import firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-toast-native';

YellowBox.ignoreWarnings(
  [
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
  ]
);


export default class SaidaCaixa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      despesa: '',
      valor: '',
      mascara: ''
    }
  }



  gravarDespesa() {
    //const ws = new WebSocket(makeSocketURL());
    const styleToast = {
      width: 300,
      height: Platform.OS === ("ios") ? 50 : 100,
      fontSize: 12,
      lineHeight: 1,
      lines: 2,
      paddingTop: -10,
      borderRadius: 15,
      yOffset: 60
    }
    const data = new Date();
    const mesAtual = data.getMonth() + 1;
    const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
    console.log("VARIAVEIS---------DESPESA: " + this.state.despesa + "-----VALOR:" + this.state.mascara.replace(/[^0-9\.]+/g, ""));

    firebase.database().ref('saidaCaixa/' + dataFinal).push().set({
      despesa: this.state.despesa,
      valor: this.state.mascara.replace(/[^0-9\.]+/g, "")

    })
    Toast.show("Despesa registrada!", Toast.SHORT, Toast.BOTTOM, styleToast);
    this.props.navigation.navigate('Entrada');
  }



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
        content={<SideBar navigation={this.props.navigation} />}
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
            <Form>
              <Item stackedLabel>
                <Label>Despesa:</Label>
                <Input

                  autoCorrect={false}
                  value={this.despesa}
                  onChangeText={text => this.setState({ despesa: text })}
                />
              </Item>
              <Item stackedLabel>
                <Label>Valor</Label>

                <TextInputMask

                  type={'money'}
                  keyboardType='numeric'
                  style={{ width: '100%' }}
                  value={this.state.mascara}
                  onChangeText={(mascara) => {
                    this.setState({ mascara })

                    //console.log("VALOR COM MASCARA "+this.state.mascara)
                  }}


                />
              </Item>
              <Button primary block
                onPress={() => this.gravarDespesa()}
                center>
                <Text>Gravar Despesa</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Drawer>
    );
  }



}
