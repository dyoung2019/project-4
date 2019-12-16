import React from 'react'
import paper from 'paper'

export default class MainCanvas extends React.Component {
  
  state = {
    imageWidth: this.props.imageWidth,
    imageHeight: this.props.imageHeight,
  }

  setupOverlay = (p, imageDimensions, canvasDimensions) => {
    // create a p5.Graphics containing the image that will be masked
    const sourceImage_1 = p.createGraphics(imageDimensions[0],imageDimensions[1]);
    // sourceImage_1.elt.id = "layer_2_src"

    sourceImage_1.attribute('resize', 'true')
    sourceImage_1.attribute('hidpi', 'false')
    sourceImage_1.addClass('paper-canvas')

    // const paperCanvas = document.querySelector('.paper-container .paper-canvas')
    this.loadPaper(sourceImage_1.elt)

    return {
      sourceImage: sourceImage_1
    }
  }

  setupSketch = (p, imageDimensions, canvasDimensions) => {
    // debugger
    const generateBackground = (w, h) => {
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

    // create a p5.Graphics containing the image that will be masked
    const vectorMask = p.createGraphics(canvasDimensions[0],canvasDimensions[1]);
    vectorMask.elt.id = "layer_1"

    vectorMask.attribute('resize', 'true')
    vectorMask.attribute('hidpi', 'true')
    vectorMask.addClass('paper-canvas')
    // layer_1.parent(paperContainer)

    // const paperCanvas = document.querySelector('.paper-container .paper-canvas')
    // loadPaper(layer_1.elt)

    const source = generateBackground(imageDimensions[0], imageDimensions[1])
    // source.elt.id = "layer_0"

    return {sourceImage: source, vectorMask: vectorMask}
  } 

  sketch = (p) => {
    const layers = []
    let canvasWidth = 500
    let canvasHeight = 500

    p.setup = () => {
      let imageDimensions = [this.state.imageWidth, this.state.imageHeight]
      let canvasDimensions = [canvasWidth, canvasHeight]

      // canvas size on screen
      p.createCanvas(canvasWidth, canvasHeight)
      layers.push(this.setupSketch(p, imageDimensions, canvasDimensions))
      layers.push(this.setupOverlay(p, imageDimensions, canvasDimensions))
    }

    p.draw = () => {
      // STEP 0: clear background color on canvas
      p.clear()
      p.background(220)
  
      let opacity = 255
      // STEP 1: layer 1 must be clear
      // vectorMask.clear()
      // p.background(0);
      // STEP 2: COLOR IS SET ON p5 instance
      // STEP 3: Draw here on layer
      const circleMask = layers[0].vectorMask
      circleMask.clear()
      p.fill(255, 255, 255, opacity)
      circleMask.ellipse(p.mouseX, p.mouseY, 250);

      // let mergeLayers = composeImages(layer_0, layer_1)
      // STEP 4A: create sub image of src image
      layers.forEach( layer => {
        const sourceImage = layer.sourceImage
        const vectorMask = layer.vectorMask

        const dx = 0
        const dy = 0
        const sx = 0
        const sy = 0


        const sWidth = sourceImage.width
        const sHeight = sourceImage.height

        const dWidth = canvasWidth;
        // console.log('dWidth' + dWidth)
        const dHeight = canvasHeight;

        // debugger;
        // console.log('dHeight' +  dHeight)

        if (vectorMask !== undefined) {
          const subMask  = vectorMask.get(0, 0, vectorMask.width, vectorMask.height)
        
          const subImage = sourceImage.get(0, 0, sourceImage.width, sourceImage.height)

          subImage.mask(subMask)

          //p.image(layer_1, 0, 0)
          // STEP 6: apply layer's blend mode
          let blendMode = p.BLEND
          p.blendMode(blendMode)
          // STEP 7: draw main canvas
          
          p.image(subImage, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
          // STEP 8: reset blend mode
          p.blendMode(p.BLEND)
        } else {
          //p.image(layer_1, 0, 0)
          // STEP 6: apply layer's blend mode
          let blendMode = p.BLEND
          p.blendMode(blendMode)
          // STEP 7: draw main canvas
          
          p.image(layer.sourceImage, dx, dy, dWidth, dHeight)
          // STEP 8: reset blend mode
          p.blendMode(p.BLEND)
        }
      })


      // STEP 4B: create sub image of mask (OPTIONAL)

      // let localMask = createMask(layer_1)
    
      // STEP 5: apply mask of subimage (copy), so src image is not updated

      // debugger
      // p.image(subImage, 0, 0)
      

      
    }
  }

  // Get a reference to the canvas object
  loadPaper = canvas => {
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    // Create a Paper.js Path to draw a line into it:
    var path = new paper.Path();
    path.strokeColor = 'black';
    path.add(new paper.Point(30, 75)); 
    path.add(new paper.Point(30, 25)); 
    path.add(new paper.Point(80, 25));
    path.add(new paper.Point(80, 75));
    path.closed = true;
    
    // Select the path, so we can see its handles:
    path.fullySelected = true;
    
    // Create a copy of the path and move it 100pt to the right:
    var copy = path.clone();
    copy.fullySelected = true;
    copy.position.x += 100;
    
    // Smooth the segments of the copy:
    copy.smooth();

    console.log('done')
  }

  componentDidMount  = () => {
    const p5Container = this.p5Container
    this.p5Scope = new window.p5(this.sketch, p5Container)
  }

  render() {
    return (
      <section className="main-canvas">
        main canvas
        <div className="central-canvas" ref={el => this.p5Container = el}></div>
      </section>
    )
  }
}