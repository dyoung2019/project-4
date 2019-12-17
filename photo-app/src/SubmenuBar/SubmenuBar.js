import React from 'react'

export default function SubmenuBar(props) {
  return (
    <section className="sub-toolbar">
      toolbar
      <div>Source</div>
      <div>Mask</div>
      <div>Thumbnail</div>
      <input type="checkbox" name="layerOn" id="layerOn"/>
      <label htmlFor="layerOn">Layer On </label>
      <input type="checkbox" name="maskOn" id="maskOn"/>
      <label htmlFor="maskOn">Mask On</label>
      <label htmlFor="opacity">Opacity</label>
      <input type="number" name="opacity" id="opacity" min="0" max="255" onChange={props.handleOpacity} value={props.opacity}/>
      <label htmlFor="blendMode">Blend mode</label>
      <select name="blendMode" id="blendMode" onChange={props.handleBlendMode} value={props.blendMode}>
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