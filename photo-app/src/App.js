import React from 'react';
import './App.css';
import LayersPanel from './LayersPanel/LayersPanel'
import SubmenuBar from './SubmenuBar/SubmenuBar'
import SourceInfoPanel from './SourceInfoPanel/SourceInfoPanel';
import LayerComposition from './MainCanvas/LayerComposition';

class App extends React.Component {
  state ={
    opacity: 128,
    blendMode: "BLEND",
    backgroundColor: '#ccccccff',
    foregroundColor: '#ccccccff',
    layers: [ 
      { 
        layerName: "apple",
        opacity: 255,
        blendMode: 'BLEND'
      }, 
      { 
        layerName: "banana",
        opacity: 128,
        blendMode: 'BLEND'
      }
    ],
    currentLayerIndex: 1
  }

  handleBackgroundColor = (colorHex) => {
    this.setState({ backgroundColor: colorHex })
  }

  handleForegroundColor = (colorHex) => {
    this.setState({ foregroundColor: colorHex })
  }

  handleLayerNameChange = (layerIndex, previousState, name) => {
    const updatedLayers = [...this.state.layers]

    const modifiedLayer = {...previousState}
    modifiedLayer.layerName = name
    updatedLayers[layerIndex] = modifiedLayer

    this.setState( { layers: updatedLayers} )
  }  

  handleLayerOpacityChange = (layerIndex, previousState, opacity) => {
    const updatedLayers = [...this.state.layers]

    const modifiedLayer = {...previousState}
    modifiedLayer.opacity = opacity
    updatedLayers[layerIndex] = modifiedLayer

    this.setState( { layers: updatedLayers} )
  }

  handleLayerBlendModeChange = (layerIndex, previousState, blendMode) => {
    const updatedLayers = [...this.state.layers]

    const modifiedLayer = {...previousState}
    modifiedLayer.blendMode = blendMode
    updatedLayers[layerIndex] = modifiedLayer

    this.setState( { layers: updatedLayers} )
  }

  // LAYERS
 
  swapLayers = (index1, index2) => {
    let updatedLayers = this.state.layers.slice()

    const tempValue = updatedLayers[index1] 
    updatedLayers[index1] = updatedLayers[index2]
    updatedLayers[index2] = tempValue
    
    this.setState({ layers: updatedLayers, currentLayerIndex: index2 })
  }

  handleMoveLayerUp = (index) => {
    this.swapLayers(index, index + 1)
  }

  handleMoveLayerDown = (index) => {
    this.swapLayers(index, index - 1)
  }

  handleAddLayer = () => {
    const noOfLayers = this.state.layers.length
    const layerItem  = { 
      layerName : `Layer ${noOfLayers}`,
      opacity: 255,
      blendMode: 'BLEND'
    }

    const updatedState = { layers: [...this.state.layers, layerItem ] }
    if (this.state.currentLayerIndex === null) {
      updatedState.currentLayerIndex = noOfLayers
    }

    this.setState(updatedState)
  }

  handleRemoveLayer = index => {
    const updatedLayers = this.state.layers.slice()
    updatedLayers.splice(index, 1)

    // WAS INDEX 
    var nextIndex = updatedLayers.length > 0
      ? updatedLayers.length - 1 
      : null

    this.setState({ layers: updatedLayers, currentLayerIndex: nextIndex} )
  }

  handleCurrentLayerIndex = (index) => {
    this.setState({ currentLayerIndex: index} )
  }

  render() {
    return (
      <div className="App">
        <header className="main-toolbar">
          Toolbar
        </header>
        <LayersPanel
          layers={this.state.layers}
          currentLayerIndex={this.state.currentLayerIndex}
          handleAddLayer={this.handleAddLayer}
          handleRemoveLayer={this.handleRemoveLayer}
          handleMoveLayerUp={this.handleMoveLayerUp}
          handleMoveLayerDown={this.handleMoveLayerDown}
          handleCurrentLayerIndex={this.handleCurrentLayerIndex}
          />
        <SubmenuBar 
          currentLayerIndex={this.state.currentLayerIndex}
          layers={this.state.layers}
          onLayerOpacityChange={this.handleLayerOpacityChange}
          onLayerBlendModeChange={this.handleLayerBlendModeChange}
          onLayerNameChange={this.handleLayerNameChange}
          />     
        <section className="compositions-panel">
          Compositions
        </section>
        <section className="key-bindings-panel">
          Key Bindings
        </section>
        <SourceInfoPanel 
          foregroundColor={this.state.foregroundColor}
          handleForegroundColor={this.handleForegroundColor}
          backgroundColor={this.state.backgroundColor}
          handleBackgroundColor={this.handleBackgroundColor} />
        {/* <MainCanvas imageWidth="400" imageHeight="300" opacity={this.state.opacity} /> */}
        <LayerComposition opacity={this.state.opacity} layers={this.state.layers} />
      </div>
    )
  }
}

export default App;
