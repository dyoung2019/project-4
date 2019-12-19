import React from 'react'
import handleNumberInput from '../Helpers/handleNumberInput'

export default function Toolbar(props) {
  return (
    <header className="main-toolbar">
      <h1>Toolbar</h1>
      <label htmlFor="canvasWidth">Canvas Width:</label>
      <input type="number" name="canvasWidth" id="canvasWidth" onChange={e => handleNumberInput(e, props.onCanvasWidthChange)} value={props.canvasWidth}/>
      <label htmlFor="canvasHeight">Canvas Height:</label>
      <input type="number" name="canvasHeight" id="canvasHeight" onChange={ e => handleNumberInput(e, props.onCanvasHeightChange)} value={props.canvasHeight} />
      <input type="radio" name="" id=""/>
    </header>
  )
}