import React from 'react';
import './App.css';
import MainCanvas from './MainCanvas/MainCanvas'
import LayersPanel from './LayersPanel/LayersPanel'
import SubmenuBar from './SubmenuBar/SubmenuBar'
import SourceInfoPanel from './SourceInfoPanel/SourceInfoPanel';

class App extends React.Component {
  state ={
    opacity: 128,
    blendMode: "BLEND",
    backgroundColor: '#ccccccff',
    foregroundColor: '#ccccccff',
    layers: ["apple", "banana", "celery"],
    currentLayerIndex: 1
  }

  handleBackgroundColor = (colorHex) => {
    this.setState({ backgroundColor: colorHex })
  }

  handleForegroundColor = (colorHex) => {
    this.setState({ foregroundColor: colorHex })
  }

  handleOpacity = (event) => {
    const target = event.target

    this.setState({ opacity: Number(target.value)})
  }

  handleBlendMode = (event) => {
    const target = event.target

    this.setState({blendMode: target.value})
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
    let updatedLayers = this.state.layers.slice()
    const noOfLayers = updatedLayers.length
    updatedLayers.push(`Layer ${noOfLayers}`)

    this.setState({ layers: updatedLayers} )
  }

  handleRemoveLayer = index => {
    const updatedLayers = this.state.layers.slice()
    updatedLayers.splice(index, 1)
    this.setState({ layers: updatedLayers})
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
          opacity={this.state.opacity}
          handleOpacity={this.handleOpacity}
          blendMode={this.state.blendMode}
          handleBlendMode={this.handleBlendMode}
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
        <MainCanvas imageWidth="400" imageHeight="300" opacity={this.state.opacity} />
      </div>
    )
  }
}

export default App;
