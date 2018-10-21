import React, { Component } from 'react';
import { StyleSheet, Platform, Alert } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Button, Icon, View, Drawer, Form, Item, Label, Input } from 'native-base';
import SideBar from './sidebar';
import firebase from 'firebase';
import Toast from 'react-native-toast-native';

export default class Estoque extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref('/estoque/');

        this.state = {
            estoque: '',
            meiokg:'0',
            umkg:'0'

        };


    }

    componentDidMount() {
        this.buscarDados();
        console.log("RESULTADO DO DATABASE: " + this.state.estoque);
    }



    buscarDados() {
        this.database.on('value', snapshot => {

            this.setState({ estoque: snapshot.val() })

        }, function (errorObject) {
            console.log("Erro na leitura do Banco de Dados: " + errorObject.code);
        });
    }

    cadastrarEstoque() {
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
        var meioInt = this.state.estoque.meiokg + (parseInt(this.state.meiokg));
        var umInt = this.state.estoque.umkg + (parseInt(this.state.umkg));
        firebase.database().ref('estoque/').update({
            umkg: umInt,
            meiokg: meioInt,
        })
        Toast.show("Venda registrada!", Toast.SHORT, Toast.BOTTOM, styleToast);
        this.buscarDados();
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
                            <Title>Estoque</Title>
                        </Body>

                    </Header>

                    <View >
                        <Text style={styles.lista}>
                            Pacotes de Meio Kg: {this.state.estoque.meiokg} {"\n"}
                            Pacotes de 1 Kg: {this.state.estoque.umkg}
                        </Text>
                    </View>
                    <View style={styles.aumentarEstoque}>
                        <Title style={styles.cadastrarEstoque}>Cadastrar estoque</Title>
                        <Form>
                            <Item stackedLabel>
                                <Label>Pacotes de 1 Kg:</Label>
                                <Input
                                    keyboardType="numeric"
                                    placeholder=''
                                    autoCorrect={false}

                                    onChangeText={text => this.setState({ umkg: text })}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Pacotes de Meio Kg:</Label>
                                <Input
                                    keyboardType="numeric"
                                    placeholder=''
                                    autoCorrect={false}

                                    onChangeText={text => this.setState({ meiokg: text })}
                                />
                            </Item>
                            <Button style={{ marginTop: 5 }} center
                                onPress={() =>
                                    Alert.alert(
                                        'Confirmar estoque',
                                        'Pacotes de 1 kg: '+this.state.umkg+
                                        '\nPacotes de Meio Kg: '+this.state.meiokg,
                                        [
                                          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                          {text: 'OK', onPress: () => this.cadastrarEstoque()},
                                        ],
                                        { cancelable: false }
                                      )}
                                >
                                <Text>Aumentar estoque</Text>
                            </Button>
                        </Form>
                    </View>

                </Container>
            </Drawer>
        );

    }
}

const styles = StyleSheet.create({
    lista: {
        fontSize: 20,
        lineHeight: 30
    },
    aumentarEstoque: {
        backgroundColor: "#ccc",
        padding: 14,
        margin: 10,
        borderTopColor: "#FFF"
    },
    cadastrarEstoque: {
        color: "black"
    }
});