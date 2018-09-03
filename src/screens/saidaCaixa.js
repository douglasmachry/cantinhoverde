import React from "react";
import { Platform,YellowBox } from "react-native";
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
  Toast,
  TabHeading
} from "native-base";
import { Drawer } from 'native-base';
import SideBar from '../sidebar';
import firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text';

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
      valor: ''
    }
  }

  

  gravarDespesa(){
    //const ws = new WebSocket(makeSocketURL());
    
    const data = new Date();
    const mesAtual = data.getMonth() + 1;
    const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
    console.log("VARIAVEIS---------DESPESA: "+this.state.despesa+"-----VALOR:"+this.state.valor);
    
    /*firebase.database().ref('saidaCaixa/'+ dataFinal).push().set({
            despesa: this.state.despesa,
            valor: this.state.valor

    }).then(() => Toast.show({
        text: 'Despesa gravada!',
        buttonText: 'Ok'
      })).catch(() => Toast.show({
        text: 'ERRO!',
        buttonText: 'Ok'
      }))*/
    
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
                  refInput={(ref) => this.state.valor = ref}
                  type={'money'}                
                  keyboardType='numeric'
                  style={{width: '100%'}}
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
