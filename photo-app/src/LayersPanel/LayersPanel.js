import React from 'react'
import LayerItem from './LayerItem'
import {ReactComponent as PlusFilled} from '../plus-filled.svg'
import './LayersPanel.css'

export default class LayersPanel extends React.Component {
  getFormattedLayers = (selectedIndex, layers) => {
    const formattedLayers = layers.map((layer, i) => {
      return {
        layerIndex: i,
        layerName: layer.layerName,
        opacity: layer.opacity,
        blendMode: layer.blendMode,
        canMoveUp: false,
        moveLayerUp: () => this.props.handleMoveLayerUp(i),
        canMoveDown: false,
        moveLayerDown: () => this.props.handleMoveLayerDown(i),
        canRemove: false,
        removeLayer: () => this.props.handleRemoveLayer(i),
        isSelected: false
      }
    })

    if (selectedIndex !== null) {
      const selectedLayer = formattedLayers[selectedIndex]
      selectedLayer.canMoveDown = (selectedIndex > 0)
      selectedLayer.canMoveUp = (selectedIndex < layers.length - 1)
      selectedLayer.canRemove = true
      selectedLayer.isSelected = true
    }

    return formattedLayers.reverse()
  }

  // filterSetSelectionIndexEvents = (index, e) => {
  //   // ONLY ACCEPT MOUSE CLICK IF PARENT 'layer-item' raises event
  //   // if (e && e.target.classList.contains('layer-item')) {
  //     this.props.handleCurrentLayerIndex(index)
  //   // }
  // }

  render() {
    const layers = this.getFormattedLayers(this.props.currentLayerIndex, this.props.layers)

    return (
      <section className="layers-panel">
        <header className="layer-panel-header">
          <h1 className="layer-panel-heading">Layers</h1>
          <div className="add-layer-btn"  onClick={this.props.handleAddLayer}>
            <PlusFilled width="5.0rem" height="5.0rem" />
            <div>ADD LAYER</div>
          </div>
        </header>
        <div className="layers-list">
        {
          layers.map(displayLayer => {
            const {
              layerIndex, 
              layerName,
              opacity,
              blendMode,
              canMoveUp, 
              moveLayerUp, 
              canMoveDown, 
              moveLayerDown,
              canRemove, 
              removeLayer,
              isSelected
            } = displayLayer
  
            return <LayerItem 
              key={layerIndex}
              isSelected={isSelected}
              handleSelectionIndex={this.props.handleCurrentLayerIndex}
              layerIndex={layerIndex} 
              layerName={layerName} 
              opacity={opacity}
              blendMode={blendMode}
              canMoveUp={canMoveUp}
              moveLayerUp={moveLayerUp}
              canMoveDown={canMoveDown} 
              moveLayerDown={moveLayerDown} 
              canRemove={canRemove}
              removeLayer={removeLayer} />
            }
          )
        }          
        </div>
      </section>
    )
  }
}