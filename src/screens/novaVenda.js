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
    Toast,
    TabHeading
} from "native-base";
import firebase from 'firebase';

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
        toast = Toast;
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
        const data = new Date();
        const mesAtual = data.getMonth() + 1;
        const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
        firebase.database().ref('vendas/'+ dataFinal).push().set({
                umkg: this.state.umkg,
                meiokg: this.state.meiokg,
                obs: this.state.observacao

        }).then(() => Toast.show({
            text: 'Venda gravada!',
            buttonText: 'Ok'
          })).catch(() => Toast.show({
            text: 'ERRO!',
            buttonText: 'Ok'
          }))
        
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
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Pacotes de 1 Kg:</Label>
                            <Input
                                keyboardType="numeric"
                                placeholder='0'
                                autoCorrect={false}
                                value={umkg}
                                onChangeText={text => this.setState({ umkg: text })}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Pacotes de Meio Kg:</Label>
                            <Input
                                keyboardType="numeric"
                                placeholder='0'
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
                            onPress={() => this.gravarVenda()}
                            center>
                            <Text>Gravar venda</Text>
                        </Button>
                    </Form>

                </Content>

            </Container>
        );

    }


}