import React from 'react'
import './LayerItem.css'

export default function LayerItem(props) {
  const layerClass = props.isSelected ? "layer-item layer-selected" : "layer-item"

  return (
    <div className={layerClass}>
      <div className="layer-description" key={props.layerIndex} onClick={() => props.handleSelectionIndex(props.layerIndex)}>
        {props.layerName} - {props.opacity} - {props.blendMode}
      </div>
      <div>
        { props.canMoveUp ? <button className="move-layer-up-btn" onClick={props.moveLayerUp}>up</button> : "" }
        { props.canMoveDown ? <button className="move-layer-down-btn" onClick={props.moveLayerDown}>down</button> : "" }
        { props.canRemove ? <button className="delete-layer-btn" onClick={props.removeLayer}>delete</button> : ""}
      </div>
    </div>
  )
}