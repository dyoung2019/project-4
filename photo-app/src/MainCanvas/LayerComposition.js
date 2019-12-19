import React from 'react'
import ProcessingContainer from './ProcessingContainer'

function refreshCanvasLayers(canvasLayers, incomingLayers) {
  // INSERT 
  const existingLayers = {}
  canvasLayers.forEach((layer, i) => {
    existingLayers[layer.sortLayerId] = i
  })

  const layersToAdd = []
  const updatedLayers = []
  incomingLayers.forEach((layer, i) => {
    const key = layer.sortLayerId
    // console.log('IN ' + layer.sortLayerId)
    let found = existingLayers[key]
    if (found === undefined) {
      const newLayer = {sortLayerId: key, index: i}
      // create new layer with p5 + paper.js
      layersToAdd.push(newLayer)

      updatedLayers.push(newLayer)
    } else {
      const existingLayer = canvasLayers[found]
      updatedLayers.push(existingLayer)
      delete existingLayers[key]
    }
  })

  const layersToDelete = Object.entries(existingLayers).map(el => {
    const [ sortLayerId, index ] = el
    return { sortLayerId: sortLayerId, index: index }
  })
  
  layersToAdd.forEach(layer => {
    console.log(`ADD ${layer.index} ${layer.sortLayerId}`)
  })

  layersToDelete.forEach(layer => {
    console.log(`DEL ${layer.index} ${layer.sortLayerId}`)
  })

  return updatedLayers
}

const paintTransparentCheckboardPattern = (bkgd, w, h) => {
  const squareSize = 35
  const noOfColumns = Math.ceil(w / squareSize)
  const noOfRows = Math.ceil(h / squareSize)

  bkgd.noStroke()
  for (let i = 0; i < noOfColumns; i++) {
    for (let j = 0; j < noOfRows; j++) {
      if ((i + j) % 2 === 0) {
        bkgd.fill(0, 0); // transparent
      } else {
        bkgd.fill(160, 255); // white
      }
      bkgd.rect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
  }
}

export default class LayerComposition extends React.Component {
  constructor(props) {
    super()
    this.canvasLayers = refreshCanvasLayers([], props.layers)
    this.p5Scope = null
    this.finalCompositionLayer = null
    this.transparentCheckboardBackground = null
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
      const createTransparentCheckboardBackground = (w, h) => {
        let bkgd  = p.createGraphics(w,h)
      
        paintTransparentCheckboardPattern(bkgd, w, h)
        return bkgd
      }

      const canvasWidth = this.props.canvasWidth
      const canvasHeight = this.props.canvasHeight

      this.finalCompositionLayer = p.createCanvas(canvasWidth, canvasHeight)
      // create a p5.Graphics containing the image that will be masked
      // this.layers = [this.generateBackground(p, w, h), p.createGraphics(w,h)]
      this.transparentCheckboardBackground = createTransparentCheckboardBackground(canvasWidth, canvasHeight)
      
    }
  
    // debugger
    p.draw = () => {
      p.clear()
      // STEP 0: clear background color on canvas
      p.background(180)
      // overlay
      // p.background(0);
  
      // Set colors
      p.fill(204, 101, 192, 127);
      p.stroke(127, 63, 120);

      // A rectangle
      p.rect(40, 120, 120, 40);

      // let opacity = this.props.opacity
      // // STEP 1: layer 1 must be clear
      // this.layers[1].clear()
      // // p.background(0);
      // // STEP 2: COLOR IS SET ON p5 instance
      // this.layers[1].stroke(255, 255, 255, opacity);
      // this.layers[1].fill(255, 255, 255, opacity);
      // // STEP 3: Draw here on layer
      // this.layers[1].ellipse(p.mouseX, p.mouseY, 250, 250);
  
      // // let mergeLayers = composeImages(this.layers[0], this.layers[1])
      // // STEP 4A: create sub image of src image
      // let subImage = this.layers[0].get(0, 0, this.layers[0].width, this.layers[0].height)
      // // STEP 4B: create sub image of mask (OPTIONAL)
      // let subMask  = this.layers[1].get(0, 0, this.layers[1].width, this.layers[1].height)
      // // let localMask = createMask(layer[1])
    
      // // STEP 5: apply mask of subimage (copy), so src image is not updated
      // subImage.mask(subMask)
      // // debugger
      // // p.image(subImage, 0, 0)
      // // STEP 6: apply layer's blend mode
      // let blendMode = p.BLEND
      // p.blendMode(blendMode)
      // // STEP 7: draw main canvas
      // // p.tint(255, opacity)
      const dx = 0
      const dy = 0
      const sx = 0
      const sy = 0

      const sourceImage = this.transparentCheckboardBackground
      const sWidth = sourceImage.width
      const sHeight = sourceImage.height

      const dWidth = this.props.canvasWidth
      // console.log('dWidth' + dWidth)
      const dHeight = this.props.canvasHeight
      // p.image(sourceImage, dx, dy)
      p.image(sourceImage, sx, sy)
      // // STEP 8: reset blend mode
      // // p.blendMode(p.BLEND)

      let fps = p.frameRate();
      p.fill(0, 255, 255, 255);
      p.stroke(0, 255);
      p.text("FPS: " + fps.toFixed(2), 10, p.height - 10);
    }
  }

  saveContext = (ctx) => {
    this.ctx = ctx;
    this.p5Scope = new window.p5(this.handleSketch, this.ctx)
  }

  componentDidUpdate(previousProps) {
    const resizeGraphics = (g, pScope, w, h) => {
      const pixelDensity = pScope.pixelDensity()
      const adjustedWidth = pixelDensity * w
      const adjustedHeight = pixelDensity * h

      g.width = w
      g.height = h
      g._renderer.resize(w, h)
      //g.resizeCanvas(w, h)
      // g.elt.width = adjustedWidth
      // g.elt.style.width = w + "px"
      // g.elt.height = adjustedHeight
      // g.elt.style.height = h + "px"
    }

    if (this.p5Scope !== null) {
      const updatedWidth = this.props.canvasWidth
      const updatedHeight = this.props.canvasHeight

      if (updatedWidth > 0 && updatedHeight > 0) {

        if (previousProps.width !== updatedWidth || previousProps.height !== updatedHeight) {
            this.p5Scope.resizeCanvas(updatedWidth, updatedHeight)

            const transparentBG = this.transparentCheckboardBackground
            resizeGraphics(transparentBG, this.p5Scope, updatedWidth, updatedHeight)

            // transparentBG.size(updatedWidth, updatedHeight)
            // transparentBG.width = updatedWidth
            // transparentBG.height = updatedHeight

            paintTransparentCheckboardPattern(transparentBG, updatedWidth, updatedHeight)
        }
      }
      
      this.canvasLayers = refreshCanvasLayers(this.canvasLayers, this.props.layers)
    }
  }
  
  render() {
    return (
      <section className="main-canvas">
        <ProcessingContainer contextRef={this.saveContext}></ProcessingContainer>
      </section>
    )
  }
}