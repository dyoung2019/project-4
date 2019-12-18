import React from 'react'
import ProcessingContainer from './ProcessingContainer'

function refreshCanvasLayers(beforeLayers, afterLayers) {
  // beforeLayers.forEach(layer => {
  //   console.log('B ' + layer)
  // })

  // afterLayers.forEach(layer => {
  //   console.log('A ' + layer)
  // })
}

export default class LayerComposition extends React.Component {
  constructor(props) {
    super()
    this.canvasLayers = refreshCanvasLayers([], props.layers)
  }

  generateBackground = (p, w, h) => {
    let bkgd  = p.createGraphics(w,h);
    // draw some stuff.
    bkgd.background(255,0,0);
    bkgd.stroke(255, 204, 0);
    
    for(var i = 0; i < p.width + 10; i += 10) {
      bkgd.strokeWeight(i/40)
      bkgd.line(i,0,i,400);
    }
    return bkgd
  }

  handleSketch = (p) => {
    p.setup = () => {
      let w = 400
      let h = 400
  
      p.createCanvas(w, h);
      p.background(220);
  
      // create a p5.Graphics containing the image that will be masked
      this.layers = [this.generateBackground(p, w, h), p.createGraphics(w,h)]
    }
  
    // debugger
    p.draw = () => {
      // p.clear()
      // STEP 0: clear background color on canvas
      p.background(0)
      // overlay
      // p.background(0);
  
      let opacity = this.props.opacity
      // STEP 1: layer 1 must be clear
      this.layers[1].clear()
      // p.background(0);
      // STEP 2: COLOR IS SET ON p5 instance
      this.layers[1].stroke(255, 255, 255, opacity);
      this.layers[1].fill(255, 255, 255, opacity);
      // STEP 3: Draw here on layer
      this.layers[1].ellipse(p.mouseX, p.mouseY, 250, 250);
  
      // let mergeLayers = composeImages(this.layers[0], this.layers[1])
      // STEP 4A: create sub image of src image
      let subImage = this.layers[0].get(0, 0, this.layers[0].width, this.layers[0].height)
      // STEP 4B: create sub image of mask (OPTIONAL)
      let subMask  = this.layers[1].get(0, 0, this.layers[1].width, this.layers[1].height)
      // let localMask = createMask(layer[1])
    
      // STEP 5: apply mask of subimage (copy), so src image is not updated
      subImage.mask(subMask)
      // debugger
      // p.image(subImage, 0, 0)
      // STEP 6: apply layer's blend mode
      let blendMode = p.BLEND
      p.blendMode(blendMode)
      // STEP 7: draw main canvas
      // p.tint(255, opacity)
      p.image(subImage, 0, 0)
      // STEP 8: reset blend mode
      // p.blendMode(p.BLEND)
    }
  }

  saveContext = (ctx) => {
    this.ctx = ctx;
    console.log(this.ctx)
    this.p5Scope = new window.p5(this.handleSketch, this.ctx)
    // setup(this.p5Scope) 
  }

  componentDidUpdate(previousProps) {
    this.canvasLayers = refreshCanvasLayers(previousProps.layers, this.props.layers)
  }
  
  render() {
    return <ProcessingContainer contextRef={this.saveContext}></ProcessingContainer>;
  }
}