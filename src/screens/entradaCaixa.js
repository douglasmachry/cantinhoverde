import React from "react";
import { Platform, YellowBox, WebSocket } from "react-native";
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
    Right,
    Label
} from "native-base";
import { Drawer } from 'native-base';
import SideBar from '../sidebar';
import firebase from 'firebase';
import NovaVenda from "./novaVenda";
//import firestore from 'firebase/firebase-firestore';
//import GLOBAL from './global';
//import firebaseAdm from 'firebase-admin';
YellowBox.ignoreWarnings(
    [
        'Warning: isMounted(...) is deprecated',
        'Module RCTImageLoader',
        'Setting a timer'
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
        const data = new Date();
        const mesAtual = data.getMonth() + 1;
        const dataFinal = data.getDate().toString() + "-" + mesAtual.toString() + "-" + data.getFullYear().toString();
        firebase.database().ref('vendas/'+dataFinal).on('value', function (snapshot) {
           console.log("RESULTADO "+ dataFinal + "----" +JSON.stringify(snapshot.val()));
           this.meiokg = 0;
           this.umkg = 0;
           snapshot.forEach(function(childSnapshot){   
            this.meiokg += childSnapshot.child("meiokg").val();
            this.umkg += childSnapshot.child('umkg').val();
            console.log("MEIO KG "+this.meiokg+" ------ UM KG "+this.umkg);
           })
           
        });
    }

    
        //ws.close();
    

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
                        <Text>Pacotes de 1Kg: {this.umkg}</Text> 
                        <Text>Pacotes de meio Kg: {this.meiokg}</Text>
                        
                        <Button block onPress={() => this.props.navigation.navigate('NovaVenda')}>
                            <Text>Nova Venda</Text>
                        </Button>
                        
                    </Content>
                </Container>
            </Drawer>
        );
    }
}