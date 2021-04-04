import axios from "axios";
import React from 'react';
import styled from 'styled-components';

export default class TitleList extends React.Component {
    state = {
        names: [],
    };

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

const Response = styled.ul`
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: rgb(43, 226, 58);

    padding: 1% 0;
    color: whitesmoke;

    li {
        margin-left: 8%;
        font-size: 100%; 
    }

    h3 {
        font-weight: 700;
        font-size: 180%;
    }

    h5 {
        font-weight: 300;
        font-size: 120%;
    }
`;

