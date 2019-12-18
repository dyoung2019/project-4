// CODE from https://codepen.io/philnash/pen/pxzVzw
// https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/
// Animation -> Canvas -> PureCanvas
// I think that React will allow us to manually update a canvas (i.e. handling over control to the user)

import React from 'react'

export default class ProcessingContainer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="central-canvas" ref={el => this.props.contextRef(el)}></div> 
    )
  }
}