import React from 'react'
import LayerItem from './LayerItem'

export default class LayersPanel extends React.Component {
  state = {
    layers: ["apple", "banana", "celery"],
    currentLayerIndex: 1
  }

  addLayer = () => {
    let updateLayers = this.state.layers.slice()
    const noOfLayers = updateLayers.length
    updateLayers.push(`Layer ${noOfLayers}`)

    this.setState({ layers: updateLayers} )
  }

  swapLayers = (index1, index2) => {
    let updatedLayers = this.state.layers.slice()

    const tempValue = updatedLayers[index1] 
    updatedLayers[index1] = updatedLayers[index2]
    updatedLayers[index2] = tempValue

    this.setState({ layers: updatedLayers})
  }

  moveLayerUp = (index) => {
    this.swapLayers(index, index + 1)
  }

  moveLayerDown = (index) => {
    this.swapLayers(index, index - 1)
  }

  deleteLayer = (index) => {
    const updatedLayers = this.state.layers.slice()
    updatedLayers.splice(index, 1)
    this.setState({ layers: updatedLayers})
  }

  getFormattedLayers = () => {
    const layers = this.state.layers
    const formattedLayers = layers.map((layer, i) => {
      return {
        layerIndex: i,
        layerName: layer,
        canMoveUp: false,
        moveLayerUp: () => this.moveLayerUp(i),
        canMoveDown: false,
        moveLayerDown: () => this.moveLayerDown(i),
        canRemove: false,
        removeLayer: () => this.moveLayer
      }
    })

    const selectedIndex = this.state.currentLayerIndex
    formattedLayers[selectedIndex].canMoveDown = (selectedIndex > 0)
    formattedLayers[selectedIndex].canMoveUp = (selectedIndex < layers.length - 1)
    formattedLayers[selectedIndex].canRemove = true

    return formattedLayers.reverse()
  }

  render() {
    const displayLayers = this.getFormattedLayers()

    return (
      <section className="layers-panel">
        <h2>Layers</h2>
        <button onClick={this.addLayer}>Add Layer</button>
        <ul>
          {
            displayLayers.map(displayLayer => {
              const {layerIndex, layerName, canMoveUp, moveLayerUp, canMoveDown, moveLayerDown, canRemove, removeLayer} = displayLayer
            
              return <LayerItem 
                key={layerIndex}
                layerIndex={layerIndex} 
                layerName={layerName} 
                canMoveUp={canMoveUp}
                moveLayerUp={moveLayerUp}
                canMoveDown={canMoveDown} 
                moveLayerDown={moveLayerDown} 
                canRemove={canRemove}
                removeLayer={removeLayer} />
            })
          }
        </ul>
      </section>
    )
  }
}