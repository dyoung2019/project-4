// CODE from https://codepen.io/philnash/pen/pxzVzw
// https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/
// Animation -> Canvas -> PureCanvas
// I think that React will allow us to manually update a canvas (i.e. handling over control to the user)

import React from 'react'
import PureCanvas from './PureCanvas'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }
  
  saveContext(ctx) {
    this.ctx = ctx;
  }
  
  componentDidUpdate() {
    const {angle} = this.props;
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.translate(width/2, height/2 );
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.fillStyle = this.props.color;
    this.ctx.fillRect(-width/4, -height/4, width/2, height/2);
    this.ctx.restore();
  }
  
  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
  }
}