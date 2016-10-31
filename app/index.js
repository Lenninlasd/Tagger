import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react');
// var ReactDOM = require('react-dom');

class Welcome extends React.Component {

    sentence(str1='Hello', str2) {
        return `${str1} ${str2}`
    }

    render() {
        let frase = this.sentence(undefined, this.props.name);
        return <h1>{frase}</h1>;
    }
}

ReactDOM.render(
  <Welcome name="devNote"/>,
  document.getElementById('app')
);
