import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react');
// var ReactDOM = require('react-dom');

const styles = {
    background: {
        background: '#000',
        float: 'left',
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0'
    },
    center: {
        margin: 'auto',
        width: '100%',
        padding: '0'
    }
};

class BackgroundImg extends React.Component {
    render() {
        return <div style={styles.background}>
                <img style={styles.center} src='img/img-1.png' alt='background'/>
            </div>;
    }
}

class Welcome extends React.Component {
    render() {
        return  <div><BackgroundImg/></div>;
    }
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // red bounding box

    createRect(ctx, 'red', [20,20,150,150]);
    createRect(ctx, 'green', [30,30,160,160]);
  }
}

function createRect(contex, color='red', coor=[]) {
    if (contex) {
        contex.beginPath();
        contex.lineWidth='6';
        contex.strokeStyle= color;
        contex.rect(...coor);
        contex.stroke();
    }
}
draw();

ReactDOM.render(
  <Welcome name="devNote"/>,
  document.getElementById('app')
);
