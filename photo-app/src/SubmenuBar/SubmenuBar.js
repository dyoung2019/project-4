import React from 'react'
import './SubmenuBar.css'
import {ReactComponent as PictureIcon} from '../picture.svg'
import {ReactComponent as DottedOutlineIcon} from '../dotted-outline.svg'
import {ReactComponent as ShapesIcon} from '../shapes.svg'

export default class SubmenuBar extends React.Component {
  handleLayerNameChange = (currentLayerIndex, currentLayer, event) => {
    const target = event.target
    this.props.onLayerNameChange(currentLayerIndex, currentLayer, target.value)
  }

  handleLayerOpacityChange = (currentLayerIndex, currentLayer, event) => {
    const target = event.target

    const updatedOpacity = Number(target.value)
    if (updatedOpacity !== Number.NaN) {
      this.props.onLayerOpacityChange(currentLayerIndex, currentLayer, target.value)
    }
  } 

  handleLayerBlendModeChange = (currentLayerIndex, currentLayer, event) => {
    const target = event.target
    
    this.props.onLayerBlendModeChange(currentLayerIndex, currentLayer, target.value)
  } 

  render() {
    const allLayers = this.props.layers

    let layerName = ''
    let layerOpacity = 0
    let layerBlendMode = 'BLEND'
    let currentLayerIndex = this.props.currentLayerIndex
    let currentLayer = null;
    if (currentLayerIndex !== null) {
      currentLayer = allLayers[currentLayerIndex]
      layerName = currentLayer.layerName
      layerOpacity = currentLayer.opacity 
      layerBlendMode = currentLayer.blendMode
    }

    return (
      <section className="sub-toolbar">
        <div className="sub-toolbar-container">
          <div className="image-toggle-btn toggle-btn-container">
            <PictureIcon width="4.5rem" height="4.5rem"></PictureIcon>
            <div>IMAGE</div>
          </div>
          <div className="shape-toggle-btn toggle-btn-container">
            <ShapesIcon width="4.5rem" height="4.5rem"/>
            <div>SHAPE</div>
          </div>
          <div className="mask-toggle-btn toggle-btn-container">
            <DottedOutlineIcon width="4.5rem" height="4.5rem" />
            <div>MASK</div>
          </div>
          <div className="isolate-on-toggle">
            <label htmlFor="isolateOn">Isolate On </label>
            <input type="checkbox" name="isolateOn" id="isolateOn"/>
          </div>
          <div className="layer-on-toggle">
            <label htmlFor="layerOn">Layer On </label>
            <input type="checkbox" name="layerOn" id="layerOn"/>
          </div>
          <div className="mask-on-toggle">
            <label htmlFor="maskOn">Mask On</label>
            <input type="checkbox" name="maskOn" id="maskOn"/>
          </div>
          <label className="layer-name-label sub-toolbar-label " htmlFor="layerName">Layer Name: </label>
          {/* <input type="text" name="layerName" id="layerName" value={currentLayer.layerName}/> */}
          <input className="layer-name-input" type="text" name="layerName" id="layerName" value={layerName} onChange={e => this.handleLayerNameChange(currentLayerIndex, currentLayer, e)} />
          <label className="opacity-label sub-toolbar-label " htmlFor="opacity">Opacity</label>
          {/* <input type="number" name="opacity" id="opacity" min="0" max="255" value={currentLayer.opacity}/> */}
          <input className="opacity-input"  type="range" name="opacity" id="opacity" min="0" max="255" onChange={e => this.handleLayerOpacityChange(currentLayerIndex, currentLayer, e)} value={layerOpacity}/>
          <label className="blend-mode-label" htmlFor="blendMode">Blend mode</label>
          {/* <select name="blendMode" id="blendMode" onChange={props.handleBlendMode} value={props.blendMode}> */}
          <select className="blend-mode-select" name="blendMode" id="blendMode" onChange={(e) =>
            this.handleLayerBlendModeChange(currentLayerIndex, currentLayer, e)} value={layerBlendMode}>
            <option value="BLEND">Blend</option>
            <option value="ADD">Add</option>
            <option value="DARKEST">Darkest</option>
            <option value="LIGHTEST">Lightest</option>
            <option value="EXCLUSION">Exclusion</option>
            <option value="MULTIPLY">Multiply</option>
            <option value="SCREEN">Screen</option>
            <option value="REPLACE">Replace</option>
            <option value="REMOVE">Remove</option>
            <option value="OVERLAY">Overlay</option>
            <option value="HARD_LIGHT">Hard Light</option>
            <option value="SOFT_LIGHT">Soft Light</option>
            <option value="DODGE">Dodge</option>
            <option value="BURN">Burn</option>
            <option value="SUBTRACT">Subtract</option>
          </select>
        </div>
      </section>
    )
  }
}