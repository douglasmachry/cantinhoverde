import React, { Component } from 'react';
import { FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Button, Icon, View, Drawer, Right } from 'native-base';
import SideBar from './sidebar';
import Toast from 'react-native-toast-native';
import firebase from 'firebase';


export default class VendasPendentes extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref('/vendas/');
        buscarDados = this.buscarDados();
        this.state = {
            recarregar: false,
            vendas: ''

        };
        

    }

    componentDidMount() {
        this.database.on('child_changed', () => {
            this.buscarDados();
        });
        this.buscarDados;
        
        
    }


    buscarDados(){
        let itens = [];
        
        this.database.on('value', snapshot => {
            //console.log("RESULTADO DO DATABASE: " + JSON.stringify(snapshot.val()));
            snapshot.forEach(function (childSnapshot) {
                let item = [];
                item['vendas'] = new Array;

                childSnapshot.forEach(function (childOfChild) {

                    if (!childOfChild.val().pago || childOfChild.val().pago == false) {
                        let obj = childOfChild.val();
                        obj.key = childOfChild.key;
                        //let vendakey = {'key':childOfChild.key};
                        //vendakey.push(childOfChild.val()); 
                        item['vendas'].push(obj);

                    } else {
                        return false;
                    }

                });
                item['data'] = childSnapshot.key;
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
                content={<SideBar navigator={this.props.navigation} />}
                onClose={() => this.closeDrawer} >
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Pagamentos Pendentes</Title>
                        </Body>

                    </Header>

                    <View>
                        <FlatList
                            data={this.state.vendas}
                            renderItem={({ item }) => (this.renderRow(item))}
                            keyExtractor={(item, index) => item.data}
                        //extraData={this.state.recarregar}

                        />
                    </View>





                </Container>
            </Drawer>
        );

    }

    renderRow(venda) {

        let linhaData = Text;
        if (Object.keys(venda.vendas).length == 0) {
            linhaData = null;
        } else {
            linhaData = <Text style={styles.data}>{venda.data.replace("-", "/").replace("-", "/")}</Text>;
        }

        return (
            <View>
                <View>
                    {linhaData}
                    {venda.vendas.map((item, index) => {
                        //console.log(index);
                        return (
                            <View key={index} style={styles.venda}>
                                <View>
                                    <Text style={styles.titleVenda}>{item.obs} - {item.hora}</Text>
                                    <Text style={styles.descricaoVenda}>
                                        Meio Kg: {item.meiokg} -
                                        Um Kg: {item.umkg} -
                                        Pago: <Text style={{ color: 'red' }}>Não</Text>
                                    </Text>
                                </View>

                                <Button rounded transparent success style={styles.pagar}
                                    onPress={() =>
                                        Alert.alert(
                                            'Confirmar pagamento?',
                                            'Pacotes de 1 kg: ' + item.umkg +
                                            '\nPacotes de Meio Kg: ' + item.meiokg +
                                            '\nObservação: ' + item.obs,
                                            [
                                                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                                { text: 'OK', onPress: () => this.pagar(item, venda.data,index) },
                                            ],
                                            { cancelable: false }
                                        )}>
                                    <Icon type="MaterialIcons" name="monetization-on" />
                                </Button>

                            </View>
                        )
                    })}
                </View>
            </View>
        );

    }

    

    pagar(pend, data,i) {
        //console.log(i); 
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
        //  console.log(pend);
        //pend.pago = true;
        firebase.database().ref('/vendas/' + data + '/' + pend.key).update({
            pago: true
        });
        Toast.show("Venda registrada!", Toast.SHORT, Toast.BOTTOM, styleToast);



        this.buscarDados();
        //this.props.navigation.navigate('Entrada');
    }

}

const styles = StyleSheet.create({
    data: {
        fontSize: 22,
        backgroundColor: "#98FB98"
    },
    venda: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 1
    },
    titleVenda: {
        fontSize: 18,
        paddingLeft: 20
        // backgroundColor: "#D3D3D3"
    },
    descricaoVenda: {
        paddingLeft: 35,
        color: "#696969",
        // backgroundColor: "#D3D3D3"
    },

});