import React from 'react';
import { styles } from './styles';


const img = new Image();
img.src = 'img/img-1.png';

class SvgRect extends React.Component {
    render() {
        return <rect width="300" height="100" x={this.props.x} y={this.props.y} style={styles.rectSvg}/>;
    }
};

class SvgComponent extends React.Component {
    render() {
        return  <svg width="800" height="600">
                    <SvgRect x={10} y={10}/>
                    <SvgRect x={100} y={100}/>
                </svg>;
    }
}

export { SvgComponent };
