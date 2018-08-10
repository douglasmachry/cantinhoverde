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
    ListItem,
    Left,
    Radio,
    Right
} from "native-base";

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
            umkg: false,
            dataNascimento: '',
            valor: '',
            parcelas: ''
        }

    }
    static navigationOptions = {
        headerTitle: "Nova Venda",
        headerBackButton: true
    }

    render() {
        const { quantidade, umkg, valor, parcelas } = this.state;
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
                        <Title>Saída de Caixa</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Quantidade</Label>
                            <Input
                                placeholder="Quantos pacotes?"

                                autoCorrect={false}
                                value={quantidade}
                                onChangeText={text => this.setState({ quantidade: text })}
                            />
                        </Item>

                        <ListItem selected={true}>
                            <Left>
                                <Text>1 Kg</Text>
                            </Left>
                            <Right>
                                <Radio value={umkg} selected={true} />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>1/2 Kg</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </ListItem>


                        <Item stackedLabel>
                            <Label>Valor a ser financiado</Label>
                            <Input
                                placeholder="R$0,00"
                                autoCorrect={false}
                                keyboardType="numeric"
                                value={valor}
                                onChangeText={text => this.setState({ valor: text })} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Quantidade de Parcelas</Label>
                            <Input

                                placeholder=""
                                autoCorrect={false}
                                keyboardType="numeric"
                                value={parcelas}
                                onChangeText={text => this.setState({ parcelas: text })} />
                        </Item>
                        <Button primary block
                            onPress={() => this.props.navigation.navigate('Resultado')}
                            center
                        ><Text>Simular</Text></Button>
                    </Form>

                </Content>

            </Container>
        );

    }


}