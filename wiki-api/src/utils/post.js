import axios from "axios";
import React from 'react';
import styled from 'styled-components';

export default class TitleInput extends React.Component {
    state = {
        title: "",
        content: "",
    };

    handleTitle = event => {
        this.setState( {
            title: event.target.value
        });
    };

    handleContent = event => {
        this.setState( {
            content: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:5000/articles', {
            title: this.state.title,
            content: this.state.content
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
            <Form onSubmit={this.handleSubmit}>
                <h1>Coloque Seus Valores de Entrada Aqui!</h1>

                <label>
                    <p>Title:</p> 
                    <input className='title' type='text' name='title' onChange={this.handleTitle}></input>
                </label>
                <br></br>
                <label>
                    <p>Content:</p> 
                    <textarea className='content' type='text' name='content' onChange={this.handleContent}></textarea>
                </label>
                <br></br>

                <button type='submit' onClick={this.Reload}>Adicionar</button>
            </Form>
        );
    }
}

const Form = styled.form`
    text-align: center;
    color: white;
    padding: 1% 0;
    
    h1 {

    }

    label {
        color: white;
        font-size: 150%;
        font-weight: 500;
    }

    .title {
        margin: 0.5%; 
        width: 50%;
    }

    .content {
        height: 150px;
        width: 80%;
        margin: 0.5%; 
    }

    button {
        background-color: rgb(43, 226, 58);
        margin: 5% 0;
        border-style: none;
        height: 50px;
        width: 30%;
        color: white;
        font-size: 150%;
        font-weight: bold;
    }
`;