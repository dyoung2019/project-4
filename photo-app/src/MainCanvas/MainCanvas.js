import React from 'react'
import paper from 'paper'

export default class MainCanvas extends React.Component {
  
  state = {
    imageWidth: this.props.imageWidth,
    imageHeight: this.props.imageHeight,
  }

  createPaperJsGraphicLayer = (p, dimensions) => {
    const sourceImage_1 = p.createGraphics(dimensions[0], dimensions[1]);
    // sourceImage_1.elt.id = "layer_2_src"

    sourceImage_1.attribute('resize', 'true')
    sourceImage_1.attribute('hidpi', 'false')
    sourceImage_1.addClass('paper-canvas')
    return sourceImage_1
  }

  setupLayerWithShapes = (p, imageDimensions, canvasDimensions) => {
    const sourceImage_1 = this.createPaperJsGraphicLayer(p, imageDimensions)
    
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

      bkgd.noStroke()
      // bkgd.background(0, 255, 0, 12) // green
      
      const squareSize = 35
      const noOfColumns = Math.ceil(w / squareSize)
      const noOfRows = Math.ceil(h / squareSize)
    
      for (let i = 0; i < noOfColumns; i++) {
        for (let j = 0; j < noOfRows; j++) {
          if ((i + j) % 2 === 0) {
            bkgd.fill(64, 0); // transparent
          } else {
            bkgd.fill(255, 255); // white
          }
          bkgd.rect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
      }
      
      return bkgd
    } 

    // create a p5.Graphics containing the image that will be masked
    const vectorMask = p.createGraphics(canvasDimensions[0],canvasDimensions[1]);
    const source = generateBackground(canvasDimensions[0], canvasDimensions[1])
    // source.elt.id = "layer_0"

    return {sourceImage: source, vectorMask: vectorMask}
  } 

  setupMaskOverlay = (localCanvas, p, canvasDimensions) => {
    
    var mainScope = new paper.PaperScope()
    mainScope.setup(localCanvas.elt)
    
    localCanvas.attribute('resize', 'true')
    localCanvas.attribute('hidpi', 'false')
    localCanvas.addClass('paper-canvas')
    
    var vectorScope = new paper.PaperScope()
    const vectorMask = this.createPaperJsGraphicLayer(p ,canvasDimensions)
    vectorMask.elt.id = "vectorScope"
    vectorScope.setup(vectorMask.elt)
    this.mirrorVectorMask(mainScope, vectorScope)

    return {sourceImage: vectorMask}
  }

  sketch = (p) => {
    const layers = []
    let canvasWidth = 500
    let canvasHeight = 500

    p.setup = () => {
      let imageDimensions = [this.state.imageWidth, this.state.imageHeight]
      let canvasDimensions = [canvasWidth, canvasHeight]

      // canvas size on screen
      const localCanvas = p.createCanvas(canvasWidth, canvasHeight)
      layers.push(this.setupSketch(p, imageDimensions, canvasDimensions))
      layers.push(this.setupLayerWithShapes(p, imageDimensions, canvasDimensions))

      layers.push(this.setupMaskOverlay(localCanvas, p, canvasDimensions))
    }

    p.draw = () => {
      // STEP 0: clear background color on canvas
      p.clear()
      p.background(220)
  
      let opacity = this.props.opacity
      // STEP 1: layer 1 must be clear
      // vectorMask.clear()
      // p.background(0);
      // STEP 2: COLOR IS SET ON p5 instance
      // STEP 3: Draw here on layer
      const circleMask = layers[0].vectorMask
      circleMask.clear()
      
      // DESTINATION SET COLOR AND OPACITY
      circleMask.stroke(255, 255, 255, opacity)
      circleMask.fill(255, 255, 255, opacity)

      circleMask.ellipse(p.mouseX, p.mouseY, 250);
      // circleMask.ellipse(0, 0, 250)

      // let mergeLayers = composeImages(layer_0, layer_1)
      // STEP 4A: create sub image of src image
      layers.forEach( layer => {
        const sourceImage = layer.sourceImage
        const vectorMask = layer.vectorMask

        const dx = 0
        const dy = 0
        const sx = 0
        const sy = 0



        const dWidth = canvasWidth;
        // console.log('dWidth' + dWidth)
        const dHeight = canvasHeight;

        // debugger;
        // console.log('dHeight' +  dHeight)

        if (sourceImage !== undefined && vectorMask !== undefined) {
          const sWidth = sourceImage.width
          const sHeight = sourceImage.height

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
        } else if (sourceImage !== undefined ){
          //p.image(layer_1, 0, 0)
          // STEP 6: apply layer's blend mode
          let blendMode = p.BLEND
          p.blendMode(blendMode)
          // STEP 7: draw main canvas
          // alpha OPACITY tinting 
          // p.tint(255, opacity)
          // debugger;s
          p.image(sourceImage, dx, dy, dWidth, dHeight)
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
  }

  // Get a reference to the canvas object
  mirrorVectorMask = (mainScope, vectorScope) => {
    console.log('hello')
    var path = new vectorScope.Path();
    path.strokeColor = 'black';
    path.add(new vectorScope.Point(30, 75)); 
    path.add(new vectorScope.Point(30, 25)); 
    path.add(new vectorScope.Point(80, 25));
    path.add(new vectorScope.Point(80, 75));
    path.closed = true;

    var copy = new vectorScope.Path()
    copy.fullySelected = true;

    // var tool = new mainScope.Tool();
    var endPoint = null
    
    function pullHandles(segment, point) {
      let dx = segment.point.x - point.x
      let dy = segment.point.y - point.y

      endPoint.handleIn = new vectorScope.Point(dx, dy)
      endPoint.handleOut = new vectorScope.Point(-dx, -dy)
    }

    mainScope.view.onMouseDown = function(event) {
      if (endPoint === null) {
        let seg = copy.add(event.point)
        // console.log("Array : " + seg)
        seg.selected = true;
        endPoint = seg
      }

      return false
    }

    mainScope.view.onMouseDrag = function(event) {
      // console.log('mouse up :' + event.point);
      if (!!endPoint) {
        pullHandles(endPoint, event.point)
      }
    }

    mainScope.view.onMouseUp = function(event) {
      // console.log('mouse up :' + event.point);
      endPoint = null
    }

    mainScope.view.onKeyDown = function(event) {
      if (event.key === 'space') {
          // Scale the path by 110%:
          // scribble.strokeColor = 'blue' 
          // Prevent the key event from bubbling
          return false;
      }
    }

    mainScope.view.onKeyUp = function(event) {
      if (event.key === 'space') {
        // Scale the path by 110%:
        // scrsibble.strokeColor = 'green' 
        // Prevent the key event from bubbling
        return false;
      }
    }

    vectorScope.view.draw()
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