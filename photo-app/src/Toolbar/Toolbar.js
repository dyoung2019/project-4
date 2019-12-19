import React from 'react'
import handleNumberInput from '../Helpers/handleNumberInput'
import {ReactComponent as PlusFilled} from '../plus-filled.svg'
import {ReactComponent as PlusLine} from '../plus-line.svg'
import {ReactComponent as Selection} from '../selection.svg'
import {ReactComponent as Pen} from '../pen.svg'
import {ReactComponent as Menu} from '../menu.svg'
import './Toolbar.css'

export default function Toolbar(props) {
  return (
    <header className="main-toolbar toolbar-container">
      <div class="menu-icon toolbar-icon">
        <Menu width="5.0rem" height="5.0rem"/>
        <div>MENU</div>
      </div>
      <div class="selection-icon tool-icon toolbar-icon">
        <Selection  width="5.0rem" height="5.0rem"/>
        <div>SELECTION</div>
      </div>
      <div className="pen-icon tool-icon toolbar-icon">
        <Pen width="5.0rem" height="5.0rem" />
        <div>PEN</div>
      </div>
      <div class="canvas-width-input toolbar-num-input">
        <label htmlFor="canvasWidth">Canvas Width:</label>
        <input type="number" name="canvasWidth" id="canvasWidth" onChange={e => handleNumberInput(e, props.onCanvasWidthChange)} value={props.canvasWidth}/>
      </div>
      <div class="canvas-height-input toolbar-num-input">
        <label htmlFor="canvasHeight">Canvas Height:</label>
        <input type="number" name="canvasHeight" id="canvasHeight" onChange={ e => handleNumberInput(e, props.onCanvasHeightChange)} value={props.canvasHeight} />
      </div>
      <h1 class="app-title">photo-app</h1>
      
    </header>
  )
}