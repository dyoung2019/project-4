import React from 'react'
import './LayerItem.css'
import {ReactComponent as ChevronUp} from '../chevron-up.svg'
import {ReactComponent as ChevronDown} from '../chevron-down.svg'
import {ReactComponent as TrashCanIcon} from '../trash.svg'

export default function LayerItem(props) {
  const layerClass = props.isSelected ? "layer-item layer-selected" : "layer-item"

  return (
    <div className={layerClass}>
      <div className="layer-description" key={props.layerIndex} onClick={() => props.handleSelectionIndex(props.layerIndex)}>
        {props.layerName} - {props.opacity} - {props.blendMode}
      </div>
      <div>
        { props.canMoveUp ? <button className="move-layers-btn" onClick={props.moveLayerUp}>
          <ChevronUp width="1.5rem" height="1.5rem" />
          </button> : "" }
        { props.canMoveDown ? <button className="move-layers-btn" onClick={props.moveLayerDown}>
          <ChevronDown width="1.5rem" height="1.5rem" />
          </button> : "" }
        { props.canRemove ? <button className="delete-layer-btn" onClick={props.removeLayer}>
          <TrashCanIcon width="1.5rem" height="1.5rem" />
          </button> : ""}
      </div>
    </div>
  )
}