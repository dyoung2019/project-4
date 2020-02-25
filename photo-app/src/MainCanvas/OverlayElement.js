import React from 'react'

export default class OverlayElement extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas ref={el => this.props.contextRef(el)} resize='true'>
      </canvas>
    )
  }
}
