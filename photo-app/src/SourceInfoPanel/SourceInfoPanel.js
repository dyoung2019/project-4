import React from 'react'
import SimpleColorPicker from '../Components/SimpleColorPicker'

export default class SourceInfoPanel extends React.Component {
  state = {
    color: '#ccccccff',
    foregroundColor: '#ccccccff',
  }

  handleBGHexChange = (colorHex) => {
    this.setState({ color: colorHex })
  }

  handleFGHexChange = (colorHex) => {
    this.setState({ foregroundColor: colorHex })
  }

  render() {
    return (
      <section className="source-info-panel">
        <h2>
          Source Info
        </h2>
        <h3>Layer Properties</h3>
        <SimpleColorPicker 
          color={this.state.color}
          fieldName="backgroundColor" 
          fieldLabel="Background Color"
          handleHexChange={this.handleBGHexChange}
        />
        <h3>Pen Properties</h3>
        <SimpleColorPicker 
          color={this.state.foregroundColor}
          fieldName="foregroundColor" 
          fieldLabel="Foreground Color"
          handleHexChange={this.handleFGHexChange}
        />        
      </section>
    )
  }
}