import React from 'react';
import './App.css';
import LayersPanel from './LayersPanel/LayersPanel'
import SubmenuBar from './SubmenuBar/SubmenuBar'
import SourceInfoPanel from './SourceInfoPanel/SourceInfoPanel';
import LayerComposition from './MainCanvas/LayerComposition';
import MainCanvas from './MainCanvas/MainCanvas';
import Toolbar from './Toolbar/Toolbar'
import KeyBindingsPanel from './KeyBindingsPanel/KeyBindingsPanel'
import CompositionsPanel from './CompositionsPanel/CompositionsPanel'


class App extends React.Component {
  constructor() {
    super()
    this.state ={
      toolMode: null,
      maskToggle: false,
      imageToggle: false,
      shapeToggle: false,
      canvasWidth: 500,
      canvasHeight: 500,
      backgroundColor: '#ccccccff',
      foregroundColor: '#ccccccff',
      layers: [],
      currentLayerIndex: null,
    }
    // FOR MATCHING
    this.nextSortLayerId = 0
  }

  handleBackgroundColor = colorHex => {
    this.setState({ backgroundColor: colorHex })
  }

  handleForegroundColor = colorHex => {
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

  handleMoveLayerUp = index => {
    this.swapLayers(index, index + 1)
  }

  handleMoveLayerDown = index => {
    this.swapLayers(index, index - 1)
  }

  handleAddLayer = () => {
    const noOfLayers = this.state.layers.length
    const layerItem  = { 
      layerName : `Layer ${noOfLayers}`,
      opacity: 255,
      blendMode: 'ADD',
      sortLayerId: this.nextSortLayerId
    }
    this.nextSortLayerId += 1


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

  handleCurrentLayerIndex = index => {
    this.setState( { currentLayerIndex: index} )
  }

  handleCanvasWidth = width => {
    this.setState({ canvasWidth: width} )
  }

  handleCanvasHeight = height => {
    this.setState( { canvasHeight: height} )
  }

  handleImageToggleButton = event => {
    console.log('image')
  }

  handleShapeToggleButton = event => {
    console.log('shape')
  }

  handleMaskToggleButton = event => {
    console.log('mask')
  }

  handleSelectionToolClicked = () => {
    this.setState({toolMode: 'SELECTION'})
  }

  handlePenToolClicked = () => {
    this.setState({toolMode: 'PEN'})
  }

  render() {
    return (
      <div className="App">
        <Toolbar 
          canvasWidth={this.state.canvasWidth}
          canvasHeight={this.state.canvasHeight}
          onCanvasWidthChange={this.handleCanvasWidth}
          onCanvasHeightChange={this.handleCanvasHeight}
          toolMode={this.state.toolMode}
          onSelectionToolClicked={this.handleSelectionToolClicked}
          onPenToolClicked={this.handlePenToolClicked}
        />
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
          onImageToggleButton={this.handleImageToggleButton}
          onShapeToggleButton={this.handleShapeToggleButton}
          onMaskToggleButton={this.handleMaskToggleButton}
          />     
        <CompositionsPanel />
        <KeyBindingsPanel />
        <SourceInfoPanel 
          foregroundColor={this.state.foregroundColor}
          handleForegroundColor={this.handleForegroundColor}
          backgroundColor={this.state.backgroundColor}
          handleBackgroundColor={this.handleBackgroundColor} />
        {/* <MainCanvas imageWidth="400" imageHeight="300" opacity="255" /> */}
        <LayerComposition 
          currentLayerIndex={this.state.currentLayerIndex} 
          layers={this.state.layers} 
          canvasWidth={this.state.canvasWidth}
          canvasHeight={this.state.canvasHeight}
          foregroundColor={this.state.foregroundColor}
          backgroundColor={this.state.backgroundColor}
          />
      </div>
    )
  }
}

export default App;
