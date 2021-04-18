import axios from "axios";
import React from 'react';
import styled from 'styled-components';

export default class TitleDelete extends React.Component {

    //função de remoção, que previamente foi instruida no backend;
    handleSubmit = event => {
        event.preventDefault();

        // Aqui, o axios repetirá o que foi criado no backend;
        axios.delete('http://localhost:5000/articles', {
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
        
    }

    Reload = event => {
        document.location.reload(true);
    }

    render() {
        return(
            <Formulario onSubmit={this.handleSubmit}>
                <h1>Remover Tudo!</h1>
                <button type='submit' onClick={this.Reload}>Deletar</button>

            </Formulario>
        );
    }
}

//Estilização
const Formulario = styled.form`
    text-align: center;
    color: white;
    padding: 1% 0;

    button {
        background-color: rgb(43, 226, 58);
        margin-top: 5%;
        border-style: none;
        height: 50px;
        width: 30%;
        color: white;
        font-size: 150%;
        font-weight: bold;
    }
`;