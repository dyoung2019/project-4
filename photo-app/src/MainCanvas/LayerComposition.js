import React from 'react'
import ProcessingContainer from './ProcessingContainer'
import paper from 'paper'
import paintTransparentCheckboardPattern from './p5/paintTransparentCheckboardPattern'
import generateBackground from './p5/generateBackground'
import refreshCanvasLayers from './refreshCanvasLayers'

export default class LayerComposition extends React.Component {
  constructor(props) {
    super()
    
    this.p5Scope = null
    this.finalCompositionLayer = null
    this.transparentCheckboardBackground = null

    this.canvasLayers = refreshCanvasLayers([], props.layers, this.pScope, props.canvasWidth, props.canvasHeight)
    this.blendModes = {}

    // PEN 
    this.mirrorPaperScope = null
    this.incompletePathOnCurrentLayer = null
    this.lastPathSegment = null
    this.currentActivePaperLayer = null 
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

      this.mirrorPaperScope = this.setupMirrorScope(this.finalCompositionLayer)

      // create a p5.Graphics containing the image that will be masked
      // this.layers = [this.generateBackground(p, w, h), p.createGraphics(w,h)]
      this.transparentCheckboardBackground = createTransparentCheckboardBackground(canvasWidth, canvasHeight)
      
      this.blendModes = {
        'BLEND': p.BLEND,
        'DARKEST': p.DARKEST,
        'LIGHTEST': p.LIGHTEST,
        'DIFFERENCE': p.DIFFERENCE,
        'MULTIPLY': p.MULTIPLY,
        'EXCLUSION': p.EXCLUSION,
        'SCREEN': p.SCREEN,
        'REPLACE': p.REPLACE,
        'OVERLAY': p.OVERLAY,
        'HARD_LIGHT': p.HARD_LIGHT,
        'SOFT_LIGHT': p.DODGE,
        'BURN': p.BURN,
        'ADD': p.ADD,
        'DODGE': p.DODGE,
        'REMOVE': p.REMOVE,
        'SUBTRACT': p.SUBTRACT
      }
    }
  
    // debugger
    p.draw = () => {
      p.clear()
      // STEP 0: clear background color on canvas
      // const backgroundColor = p.color(this.props.backgroundColor);
      // p.background(backgroundColor)
      // overlay
      // p.background(0);
  
      // Set colors
      // p.fill(204, 101, 192, 127);
      // p.stroke(127, 63, 120);

      // // A rectangle
      // p.rect(40, 120, 120, 40);

      p.image(this.transparentCheckboardBackground, 0, 0)

      const maxGreyscaleColor = 255
      const maxOpacity = 255
      const noOfLayers = this.canvasLayers.length
      for(let i = 0; i < noOfLayers; i += 1) {
        const compositeLayer = this.canvasLayers[i]
        const layerVariable = this.props.layers[i]

        const sourceImage = compositeLayer.source
        const vectorMask = compositeLayer.mask

        // draw source image
        sourceImage.clear()
        sourceImage.background(123, 32, 75, 255);
        // sourceImage.clear()
        sourceImage.fill(255, 0, 0)
        sourceImage.rect(40, 120, 120, 40)

        sourceImage.fill(150, 126, 12)
        sourceImage.rect(80, 40, 120, 40)

        
   
        // subMask.background(opaqueColor)
        
        // vectorMask.clear()
        // const opaqueColor = vectorMask.color(maxGreyscaleColor, opacity)
        // vectorMask.background(maxGreyscaleColor, layerVariable.opacity)
        // debugger;

        const subMask  = vectorMask.get(0, 0, vectorMask.width, vectorMask.height)
        const transformedSource = sourceImage.get(0, 0, sourceImage.width, sourceImage.height)
        transformedSource.mask(subMask)
        
        let blendMode = this.blendModes[layerVariable.blendMode]
        // p.blendMode(blendMode)
        p.blendMode(p.BLEND)
        p.image(vectorMask, 0 ,0)
        // p.image(transformedSource, 0 ,0)
      }

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

      // const sourceImage = this.transparentCheckboardBackground
      // const sWidth = sourceImage.width
      // const sHeight = sourceImage.height

      // const dWidth = this.props.canvasWidth
      // // console.log('dWidth' + dWidth)
      // const dHeight = this.props.canvasHeight
      // // p.image(sourceImage, dx, dy)
      // p.image(sourceImage, sx, sy)
      // // // STEP 8: reset blend mode
      p.blendMode(p.BLEND)

      let fps = p.frameRate();
      p.fill(0, 255, 255, 255);
      p.stroke(0, 255);
      p.text("FPS: " + fps.toFixed(2), 10, p.height - 10);
    }
  }

  setupMirrorScope = (canvas) => {
    const hasActivePaperLayerScope = () => {
      return this.props.currentLayerIndex !== null
    }

    const getCurrentOpenPath = () => {
      return this.incompletePathOnCurrentLayer
    }

    const getActivePaperLayerScope = () => {
      const selectedIndex = this.props.currentLayerIndex
      const selectedLayer = this.canvasLayers[selectedIndex]
      return selectedLayer.paperScope
    }

    const performHitTest = (activePaperScope, point) => {
      // CUSTOM LATER
      const hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
      }
  
      return activePaperScope.project.hitTest(point, hitOptions)
    }    

    const setCurrentPathSegment = segment => {
      this.lastPathSegment  = segment
    }

    const getCurrentPathSegment = () => {
      return this.lastPathSegment
    } 

    const closeCurrentLayerPath = (activePaperLayer) => {
      let incompletePath = this.incompletePathOnCurrentLayer
      if (!!incompletePath) {
        incompletePath.fillColor = 'white'
        incompletePath.fullySelected = false
        incompletePath.closed = true
        // FREE 
        this.incompletePathOnCurrentLayer = null
        setCurrentPathSegment(null)
        activePaperLayer.addChild(incompletePath)
      }
    }

    const createNewOpenedPath = (activePaperScope) => {
      const newPath = new activePaperScope.Path()
      newPath.fullySelected = true
      this.incompletePathOnCurrentLayer = newPath
      // this.currentActivePaperLayer.addChild(newPath)
      return newPath
    } 
    
    const insertEditablePointAtEndOfPath = (path, point) => {
      let endPoint = this.lastPathSegment 
      if (endPoint === null) {
        endPoint = path.add(point)
        endPoint.selected = true;
      }
      return endPoint
    }

    const setActivePaperScopeLayer = (scope) => {
      this.currentActivePaperLayer = scope.project.activeLayer
      return this.currentActivePaperLayer
    }

    const mirrorPaperScope = new paper.PaperScope()
    mirrorPaperScope.setup(canvas.elt)
    canvas.attribute('resize', 'true')
    canvas.attribute('hidpi', 'false')
    canvas.addClass('paper-canvas')

    mirrorPaperScope.view.onMouseDown = (event) => {
      if (hasActivePaperLayerScope()) {
        let activePaperScope = getActivePaperLayerScope()
        let activeLayer = setActivePaperScopeLayer(activePaperScope)

        let openPath = getCurrentOpenPath()
        const hitResult = performHitTest(activePaperScope, event.point)

        if (openPath && hitResult) {
          const path = hitResult.item;
          const selectedSegment = hitResult.segment
          const frontEndOfPath = path.segments[0]

          // UNLESS HIT TEST GETS FILL THEN STAGE FOR PATH FOR MOVING
          if (hitResult.type === 'segment' && selectedSegment === frontEndOfPath) {
            // AUTO CLOSE SEGMENT
            closeCurrentLayerPath(activeLayer)
            return false
          }
        }
        else if (!openPath) {
          // CREATE NEW PATH 
          openPath = createNewOpenedPath(activePaperScope)
        }

        // let path = new activePaperScope.Path.Circle(event.point, 15)
        // path.strokeColor = 'black';
        // path.fillColor = this.props.foregroundColor
        // path.closed = true;

        // this.currentActivePaperLayer.addChild(path)

        // PUT DOWN NEXT POINT ON PATH
        const segment = insertEditablePointAtEndOfPath(openPath, event.point)
        setCurrentPathSegment(segment)

        // console.log('segment add')
        // return false
      }
    }

    const handleMouseDragForPenTool = (keyHeldDown, point) => {
      const calculateDelta = (pointA, pointB) => {
        const dx = pointA.x - pointB.x
        const dy = pointA.y - pointB.y
  
        return [dx, dy]
      } 
  
      const extendPathHandles = (activePaperScope, segment, point) => {
        let [dx, dy] = calculateDelta(segment.point, point)
  
        segment.handleIn = new activePaperScope.Point(dx, dy)
        segment.handleOut = new activePaperScope.Point(-dx, -dy)
      }
      
      const extendPathHandleIndependently = (activePaperScope, segment, point) => {
        let [dx, dy] = calculateDelta(segment.point, point)
  
        segment.handleOut = new activePaperScope.Point(-dx, -dy)
      }

      let activePaperScope = getActivePaperLayerScope()
      setActivePaperScopeLayer(activePaperScope)

      const segment = getCurrentPathSegment() 
      if (!!segment) {
        if (keyHeldDown) {
          extendPathHandleIndependently(activePaperScope, segment, point)
        } else {
          extendPathHandles(activePaperScope, segment, point)
        }
      }
    }

    mirrorPaperScope.view.onMouseDrag = (event) => {
      if (hasActivePaperLayerScope()) {
        handleMouseDragForPenTool(event.modifiers.option, event.point)
      }
    }

    const handleMouseUpForPenTool = () => {
      let activePaperScope = getActivePaperLayerScope()
      setActivePaperScopeLayer(activePaperScope)

      setCurrentPathSegment(null)
    }

    mirrorPaperScope.view.onMouseUp = (event) => {
      if (hasActivePaperLayerScope()) {
        handleMouseUpForPenTool();
      }
    }

    mirrorPaperScope.view.onKeyUp = (event) => {
      if (hasActivePaperLayerScope()) {

        let activePaperScope = getActivePaperLayerScope()
        let activeLayer = setActivePaperScopeLayer(activePaperScope)

        if (event.key === 'enter') {
          // Scale the path by 110%:
          // scrsibble.strokeColor = 'green' 
          // Prevent the key event from bubbling
          console.log('enter up')
  
          let incompletePath = getCurrentOpenPath()
          if (incompletePath) {
            closeCurrentLayerPath(activeLayer)
          }
        }
      }
    }

    return mirrorPaperScope
  }

  saveContext = (divContainer) => {
    // div
    this.divContainer = divContainer;
    this.p5Scope = new window.p5(this.handleSketch, this.divContainer)
  }

  componentDidUpdate(previousProps) {
    const resizeGraphics = (g, w, h) => {
      g.width = w
      g.height = h
      g._renderer.resize(w, h)
    }

    const resizeTransparentPattern = (width, height) => {
      const transparentBG = this.transparentCheckboardBackground
      resizeGraphics(transparentBG, width, height)
      paintTransparentCheckboardPattern(transparentBG, width, height)
    }

    const determineNewCanvasDimensions = (pScope, intendedCanvasWidth, intendedCanvasHeight) => {    
      const currentCanvasWidth = pScope.width
      const currentCanvasHeight = pScope.height

      const resizingCanvasRequired = intendedCanvasWidth > 0 && intendedCanvasHeight > 0
      const canvasDimensionsHaveChanged = currentCanvasWidth !== intendedCanvasWidth || currentCanvasHeight !== intendedCanvasHeight
      const resizeCanvasNow = resizingCanvasRequired && canvasDimensionsHaveChanged

      const updatedWidth = resizeCanvasNow ? intendedCanvasWidth : currentCanvasWidth
      const updatedHeight = resizeCanvasNow ? intendedCanvasHeight : currentCanvasHeight

      return [resizeCanvasNow, updatedWidth, updatedHeight]
    }

    const resizeAllExistingLayers = (layers, width, height) => {
      layers.forEach(layer => {
        resizeGraphics(layer.mask, width, height)
        resizeGraphics(layer.source, width, height)
      })
    }

    const resizeCanvasAndAllLayers = (p5, layers, width, height) => {
      resizeTransparentPattern(width, height)
      resizeAllExistingLayers(layers, width, height)
      p5.resizeCanvas(width, height)
    }

    if (this.p5Scope !== null) {
      // USING SEPARATE STATE - OOPS
      const [resizeCanvasNow, updatedWidth, updatedHeight] = determineNewCanvasDimensions(this.p5Scope, this.props.canvasWidth, this.props.canvasHeight)
      
      this.canvasLayers = refreshCanvasLayers(this.canvasLayers, this.props.layers, this.p5Scope, updatedWidth, updatedHeight) 
      if (resizeCanvasNow) {
        resizeCanvasAndAllLayers(this.p5Scope, this.canvasLayers, updatedWidth, updatedHeight)
      }
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