import React from 'react';
import ReactDOM from 'react-dom';
import { styles } from './styles';

const img = new Image();
img.src = 'img/img-1.png';

class CanvasComponent extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    createRect(contex, color='red', coor=[]) {
        if (contex) {
            contex.beginPath();
            contex.lineWidth='6';
            contex.strokeStyle= color;
            contex.rect(...coor);
            contex.stroke();
        }
    }
    getMousePosition(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0);

        canvas.addEventListener('mousedown', (e) => {
            let positionStart = this.getMousePosition(canvas, e);
            this.createRect(ctx, 'red', [positionStart.x, positionStart.y,160,160]);
        });
        canvas.addEventListener('click', (e) => {
            let positionEnd = this.getMousePosition(canvas, e);
            this.createRect(ctx, 'green', [positionEnd.x, positionEnd.y,160,160]);
        })
    }
    render() {

        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
        );
    }
}

class Welcome extends React.Component {
    render() {
        return  <div><CanvasComponent width={img.width} height={img.height}/></div>;
    }
}

img.addEventListener("load", function() {

    ReactDOM.render(
      <Welcome name="devNote"/>, document.getElementById('app')
    );

}, false);
