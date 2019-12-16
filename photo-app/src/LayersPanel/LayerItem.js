import React from 'react'

export default function LayerItem(props) {
  return (
    <div key={props.layerIndex}>
      {props.layerName} 
      { props.canMoveUp ? <button onClick={props.moveLayerUp}>up</button> : "" }
      { props.canMoveDown ? <button onClick={props.moveLayerDown}>down</button> : "" }
      { props.canRemove ? <button onClick={props.removeLayer}>delete</button> : ""}
    </div>
  )
}