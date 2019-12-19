import React from 'react'

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
        toolbar
        <div>Source</div>
        <div>Mask</div>
        <div>Thumbnail</div>
        <label htmlFor="layerOn">Layer On </label>
        <input type="checkbox" name="layerOn" id="layerOn"/>
        <label htmlFor="maskOn">Mask On</label>
        <input type="checkbox" name="maskOn" id="maskOn"/>
        <label htmlFor="layerName">Layer Name: </label>
        {/* <input type="text" name="layerName" id="layerName" value={currentLayer.layerName}/> */}
        <input type="text" name="layerName" id="layerName" value={layerName} onChange={e => this.handleLayerNameChange(currentLayerIndex, currentLayer, e)} />
        <label htmlFor="opacity">Opacity</label>
        {/* <input type="number" name="opacity" id="opacity" min="0" max="255" value={currentLayer.opacity}/> */}
        <input type="range" name="opacity" id="opacity" min="0" max="255" onChange={e => this.handleLayerOpacityChange(currentLayerIndex, currentLayer, e)} value={layerOpacity}/>
        <label htmlFor="blendMode">Blend mode</label>
        {/* <select name="blendMode" id="blendMode" onChange={props.handleBlendMode} value={props.blendMode}> */}
        <select name="blendMode" id="blendMode" onChange={(e) =>
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
      </section>
    )
  }
}