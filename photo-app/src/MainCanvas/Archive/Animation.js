// CODE from https://codepen.io/philnash/pen/pxzVzw
// https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/
// Animation -> Canvas -> PureCanvas
// I think that React will allow us to manually update a canvas (i.e. handling over control to the user)

import React from 'react'
import Canvas from './Canvas'

export default class Animation extends React.Component {
  state = { angle: 0 }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  updateAnimationState = () => {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  render() {
    return (
      <Canvas angle={this.state.angle} color={this.props.color} />
    )
  }
}