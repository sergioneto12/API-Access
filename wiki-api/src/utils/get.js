import axios from "axios";
import React from 'react';
import styled from 'styled-components';

export default class TitleList extends React.Component {
    //Para que os dados sejam recebidos, primeiro, seu estado deve ser "vazio";
    state = {
        names: [],
    };

    //O componentDidMount vai permitir que somente haja resposta após o fim do processo;
    componentDidMount() {
        axios.get(`http://localhost:5000/articles`)
            .then(res => {
                console.log(res);
                this.setState({ names: res.data });
            })
            .catch(err => {
                console.log(err);
                this.setState(err);
            });
    }

    //Aqui ocorrerá a formatação da renderização dos dados;
    render() {
        return(
            <Response>
                { this.state.names.map(name => 
                <li key ={name.id}>
                    <h3>{name.title}</h3>
                    <h5>{name.content}</h5>
                </li>) 
                }
            </Response>
        );
    }
}

//Estilização

const Response = styled.ul`
    width: 100%;
    height: 100%;
    text-align: left;
    //background-color: rgb(43, 226, 58);
    background-color: white;

    padding: 1% 0;
    color: whitesmoke;

    li {
        //margin-left: 8%;
        font-size: 100%; 
        text-align: center;
    }

    h3 {
        font-weight: 700;
        font-size: 180%;
        color: rgb(43, 226, 58);
    }

    h5 {
        font-weight: 300;
        font-size: 120%;
        color: black;
    }
`;

