/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: "http://localhost:8000/v1/query" });

ReactDOM.render(
    <ApolloProvider client={client} >
        <IndecisionApp />
    </ApolloProvider>,
    document.getElementById('app')
);

// ReactDOM.render(
//     <IndecisionApp />,
//     document.getElementById('app')
// );