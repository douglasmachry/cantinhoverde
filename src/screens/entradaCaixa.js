import React from "react";
import { Platform, YellowBox } from "react-native";
import {
    Button,
    Text,
    Container,
    H1,
    H3,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right
} from "native-base";
import { Drawer } from 'native-base';
import SideBar from '../sidebar';
import firebase from 'firebase';
//import firestore from 'firebase/firebase-firestore';
//import GLOBAL from './global';
//import firebaseAdm from 'firebase-admin';
YellowBox.ignoreWarnings(
    [
        'Warning: isMounted(...) is deprecated',
        'Module RCTImageLoader'
    ]
);


export default class EntradaCaixa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meiokg : '',
            umkg : ''
        }
        
    }
    componentDidMount(){
        var ref = firebase.database().ref('valores');
        ref.once('value', function(snapshot){
            precos = snapshot.val();
            try{
                setState({umkg: precos.umkg});
            }catch(error){
                console.log(error);
                
            }
            
            //console.log(precos);
            //console.log("VAI TE CAGAR"); 
        });  
    }

    gravarVenda(){
        const data = new Date();
        const mesAtual = data.getMonth() + 1;
        const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
        firebase.database().ref('vendas/'+ dataFinal).push().set({
                umkg: 5,
                meiokg: 3,
                obs: "teste2"

        });
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
                            <Title>Entrada de Caixa</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <H1>Vendas de hoje: </H1>
                        <H3>Pacotes de 1Kg: </H3> 
                        <H3>Pacotes de meio Kg: </H3>
                        
                        <Button block onPress={() => this.gravarVenda()}>
                            <Text>Nova Venda</Text>
                        </Button>
                        <Text>{this.state.umkg}</Text>
                    </Content>
                </Container>
            </Drawer>
        );
    }
}