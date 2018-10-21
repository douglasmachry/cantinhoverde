import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Button, Icon, View, Drawer } from 'native-base';
import SideBar from './sidebar';
import firebase from 'firebase';


export default class FluxoCaixa extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref('/fechamentoCaixa/');

        this.state = {
            caixa:''
            
        };
        

    }

    componentDidMount() {
       this.buscarDados();
       console.log("RESULTADO DO DATABASE: " + this.state.caixa);
    }



    buscarDados() {
        this.database.on('value', snapshot => {
            
            this.setState({caixa:snapshot.val()})
            
        }, function (errorObject) {
            console.log("Erro na leitura do Banco de Dados: " + errorObject.code);
        });
    }


    render() {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        openDrawer = () => {
            this.drawer._root.open()
        };
        //this.setState({text: mes});
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
                            <Title>Fluxo de Caixa</Title>
                        </Body>

                    </Header>

                    <View >
                        <Text style={styles.lista}>
                            Entrada em Caixa: {this.state.caixa.totalEntrada} {"\n"}
                            Saída de Caixa: {this.state.caixa.totalSaida}{"\n"}
                            Saldo em Caixa: {this.state.caixa.saldoAtual}{"\n"}
                            Saldo a receber: {this.state.caixa.totalReceber}
                        </Text>
                    </View>
                </Container>
            </Drawer>
        );

    }
}

const styles = StyleSheet.create({
   lista:{
       fontSize: 20,
       lineHeight: 30
   }
});