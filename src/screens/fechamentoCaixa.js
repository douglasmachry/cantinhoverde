import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Button, Icon, View, Drawer } from 'native-base';
import SideBar from './sidebar';
import firebase from 'firebase';


export default class FechamentoCaixa extends Component {
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
                //console.log(item);
            })
            this.setState({ vendas: itens });
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
                            <Title>Fechamento de Caixa</Title>
                        </Body>

                    </Header>

                    <View>
                        <Text>FECHAMENTO DE CAIXA</Text>
                    </View>





                </Container>
            </Drawer>
        );

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
    venda: {
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 1
    },
    titleVenda: {
        fontSize: 18,
        paddingLeft: 20
    },
    descricaoVenda: {
        paddingLeft: 35,
        color: "#696969"
    }
});