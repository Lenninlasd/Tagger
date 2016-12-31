import React from 'react';
import ReactDOM from 'react-dom';
import { styles } from './styles';

const img = new Image();
img.src = 'img/img-1.png';

class SvgRect extends React.Component {
    render() {
        return <rect width={this.props.width} height={this.props.height}
            x={this.props.x} y={this.props.y} style={styles.rectSvg}/>;
    }
};

class SvgComponent extends React.Component {
    constructor (props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.move = this.move.bind(this);
        this.close = this.close.bind(this);
        this.rectList = [];
        this.rectListProps = {};

        this.state = {
            rectId: 0,
            drawRect: false,
            width: 0,
            height: 0
        };
   }
    onDragEnd(e) {
        this.rectListProps = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        };

        this.rectList.push(
            <SvgRect key={this.state.rectId} x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY}
            width={this.state.width} height={this.state.height}/>
        );
        this.setState({
            rectId: this.state.rectId + 1,
            drawRect:  true
        });
    }
    move(e) {
        if (this.state.drawRect) {
            let index = this.rectList.length - 1;

            this.setState({
                width: Math.abs(e.nativeEvent.offsetX - this.rectListProps.x),
                height: Math.abs(e.nativeEvent.offsetY - this.rectListProps.y)
            });

            this.rectList[index] = <SvgRect key={index} x={this.rectListProps.x} y={this.rectListProps.y}
                width={this.state.width} height={this.state.height}/>;
        }
    }
    close() {
        this.setState({
            drawRect:  false,
            width: 0,
            height: 0
        });
    }
    render() {
        return  <svg width="800" height="800" onMouseMove={this.move}
                    onMouseDown={this.onDragEnd} onMouseUp={this.close}
                    onMouseLeave={this.close}>
                    {this.rectList}
                </svg>;
    }
}


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
        canvas.addEventListener('mouseup', (e) => {
            let positionEnd = this.getMousePosition(canvas, e);
            this.createRect(ctx, 'yellow', [positionEnd.x, positionEnd.y,160,160]);
        });
    }
    render() {

        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
        );
    }
}

class Welcome extends React.Component {
    render() {
        return  <div>
                    <CanvasComponent width={img.width} height={img.height}/>
                    <SvgComponent/>
                </div>;
    }
}

img.addEventListener("load", function() {

    ReactDOM.render(
      <Welcome name="devNote"/>, document.getElementById('app')
    );

}, false);
