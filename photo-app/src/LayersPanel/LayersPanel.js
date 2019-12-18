import React from 'react'
import LayerItem from './LayerItem'

export default class LayersPanel extends React.Component {
  getFormattedLayers = (selectedIndex, layers) => {
    const formattedLayers = layers.map((layer, i) => {
      return {
        layerIndex: i,
        layerName: layer.layerName,
        opacity: layer.opacity,
        canMoveUp: false,
        moveLayerUp: () => this.props.handleMoveLayerUp(i),
        canMoveDown: false,
        moveLayerDown: () => this.props.handleMoveLayerDown(i),
        canRemove: false,
        removeLayer: () => this.props.handleRemoveLayer(i),
        isSelected: false
      }
    })

    const selectedLayer = formattedLayers[selectedIndex]
    selectedLayer.canMoveDown = (selectedIndex > 0)
    selectedLayer.canMoveUp = (selectedIndex < layers.length - 1)
    selectedLayer.canRemove = true
    selectedLayer.isSelected = true

    return formattedLayers.reverse()
  }

  filterSetSelectionIndexEvents = (index, e) => {
    // ONLY ACCEPT MOUSE CLICK IF PARENT 'layer-item' raises event
    if (e && e.target.classList.contains('layer-item')) {
      this.props.handleCurrentLayerIndex(index)
    }
  }

  render() {
    const layers = this.getFormattedLayers(this.props.currentLayerIndex, this.props.layers)

    return (
      <section className="layers-panel">
        <h2>Layers</h2>
        <button onClick={this.props.handleAddLayer}>Add Layer</button>
        <ul>
          {
            layers.map(displayLayer => {
              const {
                layerIndex, 
                layerName,
                opacity,
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
                handleSelectionIndex={this.filterSetSelectionIndexEvents}
                layerIndex={layerIndex} 
                layerName={layerName} 
                opacity={opacity}
                canMoveUp={canMoveUp}
                moveLayerUp={moveLayerUp}
                canMoveDown={canMoveDown} 
                moveLayerDown={moveLayerDown} 
                canRemove={canRemove}
                removeLayer={removeLayer} />
              }
            )
          }
        </ul>
      </section>
    )
  }
}