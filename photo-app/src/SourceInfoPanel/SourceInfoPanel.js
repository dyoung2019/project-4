import React from 'react'
import SimpleColorPicker from '../Components/SimpleColorPicker'

export default function SourceInfoPanel(props) {
  return (
    <section className="source-info-panel">
      <h2>
        Source Info
      </h2>
      <h3>Layer Properties</h3>
      <SimpleColorPicker 
        color={props.backgroundColor}
        fieldName="backgroundColor" 
        fieldLabel="Background Color"
        handleHexChange={props.handleBackgroundColor}
      />
      <h3>Pen Properties</h3>
      <SimpleColorPicker 
        color={props.foregroundColor}
        fieldName="foregroundColor" 
        fieldLabel="Foreground Color"
        handleHexChange={props.handleForegroundColor}
      />        
    </section>
  )
}