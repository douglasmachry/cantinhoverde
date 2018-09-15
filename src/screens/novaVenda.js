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
    Left,
    Right
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
            quantidade: '',
            umkg: '',
            meiokg: '',
            observacao: ''
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

    gravarVenda(){
        //const ws = new WebSocket(makeSocketURL());
        const styleToast={
            width: 300,
            height: Platform.OS === ("ios") ? 50 : 100,
            fontSize: 12,
            lineHeight: 1,
            lines: 2,
            paddingTop: -10,
            borderRadius: 15,
            yOffset:60
        }
        const data = new Date();
        const mesAtual = data.getMonth() + 1;
        const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
        const hora = new Date().toLocaleTimeString();
        firebase.database().ref('vendas/'+ dataFinal + "/" + hora).set({
                umkg: this.state.umkg,
                meiokg: this.state.meiokg,
                obs: this.state.observacao

        })
         Toast.show("Venda registrada!",Toast.SHORT,Toast.BOTTOM, styleToast);
         this.props.navigation.navigate('Entrada');
        
    }
    render() {
        const { umkg, meiokg, observacao } = this.state;
        
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
                                value={umkg}
                                onChangeText={text => this.setState({ umkg: text })}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Pacotes de Meio Kg:</Label>
                            <Input
                                keyboardType="numeric"
                                placeholder=''
                                autoCorrect={false}
                                value={meiokg}
                                onChangeText={text => this.setState({ meiokg: text })}
                            />
                        </Item>




                        <Item stackedLabel>
                            <Label>Observação</Label>
                            <Input

                                placeholder=""
                                autoCorrect={false}
                                value={observacao}
                                onChangeText={text => this.setState({ observacao: text })} />
                        </Item>
                        <Button primary block
                            onPress={() =>
                                this.gravarVenda()
                            }
                            center>
                            <Text>Gravar venda</Text>
                        </Button>
                    </Form>

                </Content>

            </Container>
        );

    }


}