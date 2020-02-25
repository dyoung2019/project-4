// CODE from https://codepen.io/philnash/pen/pxzVzw
// https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/
// Animation -> Canvas -> PureCanvas
// I think that React will allow us to manually update a canvas (i.e. handling over control to the user)

import React from 'react'

export default class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        width="300"
        height="300"
        ref={node =>
          node ? this.props.contextRef(node.getContext('2d')) : null
        }
      />
    )
  }
}