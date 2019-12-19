import React from 'react'
import handleNumberInput from '../Helpers/handleNumberInput'
import {ReactComponent as Selection} from '../selection.svg'
import {ReactComponent as Pen} from '../pen.svg'
import {ReactComponent as Menu} from '../menu.svg'
import './Toolbar.css'

export default function Toolbar(props) {
  const toolMode = props.toolMode 

  let selectionClassNames = "selection-icon tool-icon toolbar-icon"
  let penClassNames = "pen-icon tool-icon toolbar-icon"
  if (toolMode === 'SELECTION') {
    selectionClassNames += ' tool-selected'
  } else if (toolMode === 'PEN') {
    penClassNames += ' tool-selected'
  }

  return (
    <header className="main-toolbar toolbar-container">
      <div className="menu-icon toolbar-icon">
        <Menu width="5.0rem" height="5.0rem"/>
        <div>MENU</div>
      </div>
      <div className={selectionClassNames} onClick={props.onSelectionToolClicked}>
        <Selection  width="5.0rem" height="5.0rem"/>
        <div>SELECTION</div>
      </div>
      <div className={penClassNames} onClick={props.onPenToolClicked}>
        <Pen width="5.0rem" height="5.0rem" />
        <div>PEN</div>
      </div>
      <div className="canvas-width-input toolbar-num-input">
        <label htmlFor="canvasWidth">Canvas Width:</label>
        <input type="number" name="canvasWidth" id="canvasWidth" onChange={e => handleNumberInput(e, props.onCanvasWidthChange)} value={props.canvasWidth}/>
      </div>
      <div className="canvas-height-input toolbar-num-input">
        <label htmlFor="canvasHeight">Canvas Height:</label>
        <input type="number" name="canvasHeight" id="canvasHeight" onChange={ e => handleNumberInput(e, props.onCanvasHeightChange)} value={props.canvasHeight} />
      </div>
      <h1 className="app-title">photo-app</h1>
      
    </header>
  )
}