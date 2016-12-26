import React from 'react';
import ReactDOM from 'react-dom';
import { styles } from './styles';

function render(){

    const img = new Image();
    img.src = 'img/img-1.png';
    img.addEventListener("load", function() {

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
            updateCanvas() {
                const ctx = this.refs.canvas.getContext('2d');
                ctx.drawImage(img,0,0);
                this.createRect(ctx, 'red', [20,20,150,150]);
                this.createRect(ctx, 'green', [30,30,160,160]);
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

        ReactDOM.render(
          <Welcome name="devNote"/>, document.getElementById('app')
        );

    }, false);
}

render();
