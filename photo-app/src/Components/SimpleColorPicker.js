import React from 'react'
import './SimpleColorPicker.css'
import convertToRGBAHex from '../Helpers/Color/convertToRGBAHex'
import { SketchPicker } from 'react-color'

export default class SimpleColorPicker extends React.Component
{
  state = {
    displayColorPicker: false
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleColorChange = color => {
    
    const hexString = convertToRGBAHex(color.rgb)
    this.props.handleHexChange(hexString)
  }

  render() {
    let swatchColorStyle = {
      backgroundColor: this.props.color,
    }

    let pickerContainerClass = this.state.displayColorPicker 
      ? "picker-container picker-visible" 
      : "picker-container"

    return (
      <div className="simple-color-picker">
        <div className="swatch-top-row">
          <label className="swatch-label" htmlFor={this.props.fieldName}>{this.props.fieldLabel}</label>
          <div id={this.props.fieldName} className="swatch-container" onClick={ this.handleClick }>
            <div className="swatch-color" style={swatchColorStyle} />
            {
              this.state.displayColorPicker 
              ? <div className="swatch-close-button" onClick={ this.handleClick } >X</div> 
              : null
            }
          </div>
        </div>
        <div className={pickerContainerClass}>
          <SketchPicker color={this.props.color} onChange={ this.handleColorChange } />
        </div>
      </div>
    )
  }
}