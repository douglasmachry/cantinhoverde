import React from "react";
import { Platform, YellowBox, Alert } from "react-native";
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
    Left,
    CheckBox
} from "native-base";
import firebase from 'firebase';
import Toast from 'react-native-toast-native';

YellowBox.ignoreWarnings(
    [
        'Warning: (...) is deprecated (...)',
        'Module RCTImageLoader',
        'Warning: component',
        'Warning: failed'
    ]
);


export default class NovaVenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            umkg: '0',
            meiokg: '0',
            observacao: '',
            checked: false,
            clicked: {}
        }

    }
    static navigationOptions = {
        headerTitle: "Nova Venda",
        headerBackButton: true
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    gravarVenda() {
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
        const hora = new Date().toLocaleTimeString();
        firebase.database().ref('vendas/' + dataFinal).push({
            umkg: this.state.umkg,
            meiokg: this.state.meiokg,
            obs: this.state.observacao,
            hora: hora,
            pago: this.state.checked

        })
        Toast.show("Venda registrada!", Toast.SHORT, Toast.BOTTOM, styleToast);
        this.props.navigation.navigate('Entrada');

    }
    render() {

        //const { umkg, meiokg, observacao } = this.state;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Lançar nova venda</Title>
                    </Body>

                </Header>
                <Content>
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




                        <Item stackedLabel>
                            <Label>Observação</Label>
                            <Input

                                placeholder=""
                                autoCorrect={false}
                                
                                onChangeText={text => this.setState({ observacao: text })} />
                        </Item>
                        <Item>
                            <CheckBox checked={this.state.checked} title="Pago"
                                onPress={() => this.setState({ checked: !this.state.checked })} />
                            <Label>    Pago</Label>
                        </Item>
                        <Button primary block
                            onPress={() =>
                                Alert.alert(
                                    'Confirmar venda',
                                    'Pacotes de 1 kg: '+this.state.umkg+
                                    '\nPacotes de Meio Kg: '+this.state.meiokg+
                                    '\nObservação: '+this.state.observacao+
                                    '\nPago: '+(this.state.checked ? 'Sim' : 'Não'),
                                    [
                                      {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                      {text: 'OK', onPress: () => this.gravarVenda()},
                                    ],
                                    { cancelable: false }
                                  )}
                            center>
                            <Text>Gravar venda</Text>
                        </Button>
                    </Form>

                </Content>

            </Container>
        );

    }


}