import React from 'react'
import SimpleColorPicker from '../Components/SimpleColorPicker'
import './SourceInfoPanel.css'

export default function SourceInfoPanel(props) {
  return (
    <section className="source-info-panel">
      <h2 className="source-info-heading">
        Source Info
      </h2>
      <div className="properties-container">
        <section>
          <h3>Layer Properties</h3>
          <SimpleColorPicker 
            color={props.backgroundColor}
            fieldName="backgroundColor" 
            fieldLabel="Background Color"
            handleHexChange={props.handleBackgroundColor}
          />
        </section>
        <section>
          <h3>Pen Properties</h3>
          <SimpleColorPicker 
            color={props.foregroundColor}
            fieldName="foregroundColor" 
            fieldLabel="Foreground Color"
            handleHexChange={props.handleForegroundColor}
          />
        </section>
   
      </div>
    </section>
  )
}