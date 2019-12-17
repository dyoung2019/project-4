import React from 'react'
import paper from 'paper'

export default class MainCanvas extends React.Component {
  
  constructor(props) {
    super()
    this.currentPaperScope = null
    this.incompletePathOnCurrentLayer = null
    this.lastPathSegment = null
    this.state = {
      imageWidth: props.imageWidth,
      imageHeight: props.imageHeight,
    }
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
      // p.noLoop()
    }

    const composeLayers = () => {
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
      circleMask.ellipse(0, 0, 250)

      // let mergeLayers = composeImages(layer_0, layer_1)
      // STEP 4A: create sub image of src image
      layers.forEach( (layer, i) => {
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

      let fps = p.frameRate();
      p.fill(0, 255, 255, 255);
      p.stroke(0, 255);
      p.text("FPS: " + fps.toFixed(2), 10, p.height - 10);
    }

    p.draw = () => {
      composeLayers()
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

  createNewOpenedPathIfRequired = (processingScope) => {
    let incompletePath = this.incompletePathOnCurrentLayer

    if (incompletePath === null) {
      incompletePath = new processingScope.Path()
      incompletePath.fullySelected = true
      this.incompletePathOnCurrentLayer = incompletePath
    }
    return incompletePath
  } 

  insertEditablePointAtEndOfPath = (path, point) => {
    let endPoint = this.lastPathSegment 
    if (endPoint === null) {
      endPoint = path.add(point)
      endPoint.selected = true;
    }
    return endPoint
  }

  setCurrentPathSegment = segment => {
    this.lastPathSegment  = segment
  }

  getCurrentPathSegment = () => {
    return this.lastPathSegment
  }

  closeCurrentLayerPath = () => {
    let incompletePath = this.incompletePathOnCurrentLayer
    if (!!incompletePath) {
      incompletePath.fillColor = 'white'
      incompletePath.fullySelected = false
      incompletePath.closed = true
      // FREE 
      this.incompletePathOnCurrentLayer = null
      this.setCurrentPathSegment(null)
    }
  }

  // Get a reference to the canvas object
  mirrorVectorMask = (mainScope, vectorScope) => {
    
    this.currentPaperScope = vectorScope

    console.log('paper.activeLayer' + paper.project.activeLayer)
    var path = new this.currentPaperScope.Path();
    path.strokeColor = 'black';
    path.fillColor = 'red'
    path.add(new this.currentPaperScope.Point(30, 75)); 
    path.add(new this.currentPaperScope.Point(30, 25)); 
    path.add(new this.currentPaperScope.Point(80, 25));
    path.add(new this.currentPaperScope.Point(80, 75));
    path.add(new this.currentPaperScope.Point(85, 95));
    path.closed = true;

    var currentLayerRef = this.currentPaperScope.project.activeLayer
    console.log(currentLayerRef)

    // console.log('currentPaperScope.activeLayer' + this.currentPaperScope.project.activeLayer)
    // console.log(paper.project.layers)
    // console.log(paper.projects)
    // console.log(this.currentPaperScope.project.layers)
    // console.log(this.currentPaperScope.projects)

    var localPath = null;
    mainScope.view.onMouseDown = (event) => {
      let incompletePath = localPath

      if (incompletePath === null) {
        incompletePath = new this.currentPaperScope.Path()
        incompletePath.fullySelected = true
        localPath = incompletePath
        // currentLayerRef.addChild(localPath)
      }

      const segment = this.insertEditablePointAtEndOfPath(incompletePath, event.point)
      this.setCurrentPathSegment(segment)
      // STOP BUBBLING
      return false
    }

    const calculateDelta = (pointA, pointB) => {
      const dx = pointA.x - pointB.x
      const dy = pointA.y - pointB.y

      return [dx, dy]
    } 

    const extendPathHandles = (segment, point) => {
      let [dx, dy] = calculateDelta(segment.point, point)

      segment.handleIn = new this.currentPaperScope.Point(dx, dy)
      segment.handleOut = new this.currentPaperScope.Point(-dx, -dy)
    }
    
    const extendPathHandleIndependently = (segment, point) => {
      let [dx, dy] = calculateDelta(segment.point, point)

      segment.handleOut = new this.currentPaperScope.Point(-dx, -dy)
    }

    mainScope.view.onMouseDrag = (event) => {
      // console.log('mouse up :' + event.point);
      const segment = this.getCurrentPathSegment() 
      if (!!segment) {
        if (event.modifiers.option) {
          extendPathHandleIndependently(segment, event.point)
        }
        else {
          extendPathHandles(segment, event.point)
        }
      }
    }

    mainScope.view.onMouseUp = (event) => {
      // console.log('mouse up :' + event.point);
      this.setCurrentPathSegment(null)
    }

    mainScope.view.onKeyDown = (event) => {
      if (event.key === 'enter') {

        let incompletePath = localPath
        if (incompletePath) {
          incompletePath.fillColor = 'white'

          // FREE 

          // var path2 = new this.currentPaperScope.Path();
          // path2.strokeColor = 'black';
          // path2.fillColor = 'blue'
          // path2.add(new this.currentPaperScope.Point(130, 75)); 
          // path2.add(new this.currentPaperScope.Point(130, 25)); 
          // path2.add(new this.currentPaperScope.Point(180, 25));
          // path2.add(new this.currentPaperScope.Point(180, 75));
          // path2.closed = true;

          // currentLayerRef.addChild(path2)

          localPath = null
          this.setCurrentPathSegment(null)

          incompletePath.fullySelected = false
          incompletePath.closed = true

          currentLayerRef.addChild(incompletePath)
          
          // console.log('currentPaperScope.activeLayer 2 ' + this.currentPaperScope.project.activeLayer)
          // console.log(paper.project.layers)
          // console.log(paper.projects)
          // console.log(this.currentPaperScope.project.layers)
          // console.log(this.currentPaperScope.projects)
          return false
        }
        else {
          return true
        }
      } else if (event.key === 'space') {
          // Scale the path by 110%:
          // scribble.strokeColor = 'blue' 
          // Prevent the key event from bubbling
          return false;
      }
      else {
        return true
      }
    }

    // mainScope.view.onKeyUp = function(event) {
    //   if (event.key === 'space') {
    //     // Scale the path by 110%:
    //     // scrsibble.strokeColor = 'green' 
    //     // Prevent the key event from bubbling
    //     return false;
    //   }
    // }
    // var timeDelta = 0
    // mainScope.view.onFrame = (event) => {
    //   timeDelta += event.delta
    //   if (timeDelta > (1.0 / 45.0)) {
    //       path.rotate(3);

    //       // console.log(event.count);

    //       // The total amount of time passed since
    //       // the first frame event in seconds:
    //       // console.log(event.time);
        
    //       // The time passed in seconds since the last frame event:
    //       // console.log(event.delta);
    //       this.p5Scope.redraw()
    //       timeDelta = 0
    //   }
    // }

    this.currentPaperScope.view.draw()
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