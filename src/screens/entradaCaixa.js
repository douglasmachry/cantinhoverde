import React from "react";
import { Platform, YellowBox, StyleSheet } from "react-native";
import {
    Button,
    Text,
    Container,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Drawer,
    View
} from "native-base";
import SideBar from './sidebar';
import firebase from 'firebase';
//import NovaVenda from "./novaVenda";
//import firestore from 'firebase/firebase-firestore';
//import GLOBAL from './global';
//import firebaseAdm from 'firebase-admin';
YellowBox.ignoreWarnings(
    [
        'Warning: isMounted(...) is deprecated',
        'Module RCTImageLoader',
        'Setting a timer',
        'Cannot update'
    ]
);


export default class EntradaCaixa extends React.Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref('/fechamentoCaixa/');
        this.state = {
            caixa:'',
            umkg: 0,
            meiokg: 0,
            vendas: 0
        }

    }
    componentWillMount() {
       this.buscarDados();
    }

    componentDidMount(){
        
    }

    buscarDados() {
        this.database.on('value', snapshot => {
            
            this.setState({caixa:snapshot.val()})
            
        }, function (errorObject) {
            console.log("Erro na leitura do Banco de Dados: " + errorObject.code);
        });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    //ws.close();


    render() {
        //console.log(this.props.navigation);

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()} >
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.openDrawer()}
                            >
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Administrar Vendas</Title>
                        </Body>
                        
                    </Header>
                    <Content padder>
                        <View >
                            <Text>
                                Entrada em Caixa: R$ {this.state.caixa.totalEntrada} {"\n"}
                                Saída de Caixa: R$ {this.state.caixa.totalSaida}{"\n"}
                                Saldo em Caixa: R$ {this.state.caixa.totalEntrada - this.state.caixa.totalSaida}{"\n"}
                                Saldo a receber: R$ {this.state.caixa.totalReceber}
                            </Text>
                        </View>
                        <View>

                        </View>

                        <Button style={{ marginTop: 5 }} block onPress={() => this.props.navigation.navigate('NovaVenda')}>
                            <Text>Nova Venda</Text>
                        </Button>

                        <Button style={{ marginTop: 5 }} block onPress={() => this.props.navigation.navigate('VendasPendentes')}>
                            <Text>Pagamentos Pendentes</Text>
                        </Button>
                        <Button style={{ marginTop: 5 }} block onPress={() => this.props.navigation.navigate('Saida')}>
                            <Text>Nova Despesa</Text>
                        </Button>

                    </Content>
                </Container>
            </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    lista:{
        fontSize: 17,
        lineHeight: 17
    }
 });