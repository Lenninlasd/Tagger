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

class SvgImage extends React.Component {
    render() {
        return <image xlinkHref={this.props.src} x="0" y="0"/>
    }
}

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
            let width = e.nativeEvent.offsetX - this.rectListProps.x;
            let height = e.nativeEvent.offsetY - this.rectListProps.y;
            let x = width < 0 ? e.nativeEvent.offsetX : this.rectListProps.x;
            let y = height < 0 ? e.nativeEvent.offsetY : this.rectListProps.y;

            this.setState({
                width: Math.abs(width),
                height: Math.abs(height)
            });

            this.rectList[index] = <SvgRect key={index} x={x} y={y}
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
        return  <svg width={this.props.width} height={this.props.height} onMouseMove={this.move}
                    onMouseDown={this.onDragEnd} onMouseUp={this.close}
                    onMouseLeave={this.close}>
                    <SvgImage src={img.src}/>
                    {this.rectList}
                </svg>;
    }
}

class Welcome extends React.Component {
    render() {
        return  <div>
                    <SvgComponent width={img.width} height={img.height}/>
                </div>;
    }
}

img.addEventListener('load', function() {

    ReactDOM.render(
      <Welcome name='devNote'/>, document.getElementById('app')
    );

}, false);
