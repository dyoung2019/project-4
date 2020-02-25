import React from 'react'
import paper from 'paper'
import './MainComposer.css'
import ProcessingContainer from './ProcessingContainer'
import drawRedRectSketch from './p5/drawRedRectSketch'
import getOverlayClassName from './MainComposer/getOverlayClassName'
import pickOverlayCoords from './MainComposer/pickOverlayCoords'
import enablePanning from './MainComposer/enablePanning'
import clampZoomLevel from './MainComposer/clampZoomLevel'
import performZoom from './MainComposer/performZoom'
import OverlayElement from './OverlayElement'

import performHitTest from './paper/performHitTest'
import insertEditablePointAtEndOfPath from './paper/insertEditablePointAtEndOfPath'
import handleMouseDragForPenTool from './paper/handleMouseDragForPenTool'

export default class MainComposer extends React.Component {
  constructor() {
    super()
    this.state = {
      isOverlayHidden: false,
      zoomLevel: 1,
      zoomIncrement: 0.1,
      isPanning: false,
      topLeftCorner: {x : 0, y : 0},
      lastMousePosition: [0, 0] // x, y
    }
    this.mainComposition = React.createRef()
    this.overlayCanvas = React.createRef()
    this.overlayEngine = null
    this.divContainer = null
    this.p5Scope = null
  } 

  // componentDidMount() {
  //   this.mainComp = React.createRef();
  // }

  hideOverlay = () => {
    const setIsOverlayOn = (isHidden) => {
      this.setState({ isOverlayHidden : isHidden })
    }

    setIsOverlayOn(!this.state.isOverlayHidden)
  }

  setZoomLevel = (level) => {
    this.setState({zoomLevel: clampZoomLevel(level)})
  }

  // handleMagnify = (event) => {
  //   // console.log('raw', event.x, event.y)
  
  //   // const [ox, oy] = pickOverlayCoords(event)
  //   // console.log('over', ox, oy)
  
  //   // const [sx, sy] = pickCanvasCoords(this.mainComp, this.state.zoomLevel, event.clientX, event.clientY)
  //   // console.log('inside-scale', sx, sy)
  // }

  // handlePicking = (e) => {
  //   // console.log('main', e.x, e.y)
  
  //   // const [sx, sy] = pickCanvasCoords(this.mainComp, this.state.zoomLevel, event.clientX, event.clientY)
  
  //   // console.log('inside', ix, iy)
  //   // console.log('inside-scale', sx, sy)
  // }

  setScrollPosition = (deltaX, deltaY) => {
    // application state 
    const topLeftCorner = {...this.state.topLeftCorner}
    topLeftCorner.x += deltaX
    topLeftCorner.y += deltaY
    this.setState({ topLeftCorner })
  }

  setLastMousePosition = (x, y) => {
    const lastMousePosition = [ x, y ]
    this.setState({ lastMousePosition })
  }

  panCanvas = (x1, y1, x2, y2) => {
    let deltaX = x1 - x2 
    let deltaY = y1 - y2 
    
    // application state 
    this.setScrollPosition(deltaX, deltaY)
  }  

  handleMouseMove = e => {
    // Update values on pan/scroll
    if (this.state.isPanning) {
      const [x1, y1] = this.state.lastMousePosition
      const [x2, y2] = pickOverlayCoords(e)
      this.panCanvas(x1, y1, x2, y2)
      this.setLastMousePosition(x2, y2)
    }
  }

  setIsPanning = (isPanning) => {
      this.setState({ isPanning })
  }

  handleMouseDown = e => {
    // begin pan/scrolling
    const [x2, y2] = pickOverlayCoords(e)
    this.setLastMousePosition(x2, y2)
    enablePanning(this.setIsPanning, this.setLastMousePosition, true)
  }  

  handleMouseUp = e => {
    //  end pan/scrolling
    if (this.state.isPanning) {
      const [x1, y1] = this.state.lastMousePosition
      const [x2, y2] = pickOverlayCoords(e)
      this.panCanvas(x1, y1, x2, y2);
      enablePanning(this.setIsPanning, this.setLastMousePosition, false)
    }
  } 

  initOverlayEngine = () => {
    const scope = new paper.PaperScope()    
    const canvas = this.overlayCanvas
    scope.setup(canvas)
    // console.log(canvas)
    canvas.setAttribute('resize', 'true')
    canvas.setAttribute('hidpi', 'false')
    canvas.style.backgroundColor = 'transparent'
    canvas.classList.add('paper-canvas')
    return scope
  }

  handleSketch = p5 => {
    p5.setup = () => {
      this.mainComposition = p5.createCanvas(400, 400)

      this.overlayEngine = this.initOverlayEngine()
      
      const drawRing = (scope) => {
        const drawsCircle = (c, center, size) => {
          if (c !== null) {
              c.remove();
          }    
        
          // var viewH = Math.min(size.width, size.height) / 3
  
          var path = new scope.Path.Circle(new scope.Point(80, 50), 30)
          path.strokeColor = 'white'
          path.strokeWidth = 10
        
          // DUPLICATE LAST POINT TO CREATE OPEN PATH THAT LOOK LIKE A CLOSED PATH
          if (path.closed) {
              var first = path.firstSegment
              var last = path.lastSegment
              var finalSegment = path.add(first.point)
              // console.log(last.handleIn)
              // console.log(first.handleOut)
              finalSegment.handleOut = last.handleIn
              finalSegment.handleIn = first.handleIn
            path.closed = false
          }
        
          var length = path.length
          //console.log(length)
          
          var halfWay = path.getLocationAt(length * 0.85)
          //console.log(halfWay)
          var splitCurve = path.splitAt(halfWay)
          splitCurve.strokeColor = 'green'
          
          // var pathLength = path.
          // shortPath.strokeColor = new Color(1, 0, 0);
          // shortPath.strokeWidth = 3
          // path.remove();
          return path;
        }
        
        var c1 = drawsCircle(null, scope.view.center, scope.view.size)
      }

      const hasActivePaperLayerScope = () => {
        return true
      }

      const getActivePaperLayerScope = () => {
        return this.overlayEngine
      }

      let currentActivePaperLayer = null
      const setActivePaperScopeLayer = (scope) => {
        currentActivePaperLayer = scope.project.activeLayer
        return currentActivePaperLayer
      }

      let lastPathSegment = null
      const setCurrentPathSegment = segment => {
        lastPathSegment = segment
      }
      
      const getCurrentPathSegment = () => {
        return lastPathSegment
      }         
      
      let incompletePathOnCurrentLayer = null
      const getCurrentOpenPath = () => {
        return incompletePathOnCurrentLayer
      }
      const setCurrentOpenPath = (path) => {
        incompletePathOnCurrentLayer = path
      }

      const createNewOpenedPath = (scope) => {
        const newPath = new scope.Path()
        newPath.fullySelected = true
        incompletePathOnCurrentLayer = newPath
        // this.currentActivePaperLayer.addChild(newPath)
        return newPath
      }      

      const writeOutPath = (activePaperLayer, path) => {
        this.incompletePathOnCurrentLayer = null
        setCurrentPathSegment(null)
        activePaperLayer.addChild(path)
      }

      const closeCurrentLayerPath = (activePaperLayer) => {
        let incompletePath = incompletePathOnCurrentLayer
        if (!!incompletePath) {
          incompletePath.fillColor = 'white'
          incompletePath.fullySelected = false
          incompletePath.closed = true
          // FREE 
          incompletePathOnCurrentLayer = null
          setCurrentPathSegment(null)
          activePaperLayer.addChild(incompletePath)
        }
      }        
      
      const handlePen = (event) => {
        if (hasActivePaperLayerScope()) {
          let activePaperScope = getActivePaperLayerScope()
          // console.log('activePaperScope', activePaperScope)
          let activeLayer = setActivePaperScopeLayer(activePaperScope)
          // console.log('activeLayer', activeLayer)
          
          let openPath = getCurrentOpenPath()
          const hitResult = performHitTest(activePaperScope, event.point)
          
          // debugger;
          if (openPath && hitResult) {
            const path = hitResult.item;
            const selectedSegment = hitResult.segment
            const frontEndOfPath = path.segments[0]

            // debugger;
  
            // UNLESS HIT TEST GETS FILL THEN STAGE FOR PATH FOR MOVING
            if (hitResult.type === 'segment' && selectedSegment === frontEndOfPath) {
              // AUTO CLOSE SEGMENT
              closeCurrentLayerPath(activeLayer)
              // writeOutPath(activeLayer, openPath)
              return false
            }
          }
          else if (!openPath) {
            console.log('open path')
            // CREATE NEW PATH 
            openPath = createNewOpenedPath(activePaperScope)
            setCurrentOpenPath(openPath)
          }
  
          // let path = new activePaperScope.Path.Circle(event.point, 15)
          // path.strokeColor = 'black';
          // path.fillColor = 'red'
          // path.closed = true;

          // PUT DOWN NEXT POINT ON PATH
          console.log('lastPathSegment', lastPathSegment)
          const segment = insertEditablePointAtEndOfPath(lastPathSegment, openPath, event.point)
          console.log('segment', segment)
          setCurrentPathSegment(segment)
        }
      }

      this.overlayEngine.view.onMouseDown = (event) => {
        // console.log(event)
        handlePen(event)
      }

      this.overlayEngine.view.onMouseDrag = (event) => {
        if (hasActivePaperLayerScope()) {
          let activePaperScope = getActivePaperLayerScope()
          setActivePaperScopeLayer(activePaperScope)
  
          const segment = getCurrentPathSegment() 
          handleMouseDragForPenTool(activePaperScope, segment, event.modifiers.option, event.point)
        }
      }
      
      this.overlayEngine.view.onMouseUp = (event) => {
        const handleMouseUpForPenTool = () => {
          let activePaperScope = getActivePaperLayerScope()
          setActivePaperScopeLayer(activePaperScope)
    
          setCurrentPathSegment(null)
        }

        if (hasActivePaperLayerScope()) {
          handleMouseUpForPenTool()
        }
      }   
      
      this.overlayEngine.view.onKeyUp = (event) => {
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
              // writeOutPath(activeLayer, incompletePath)
            }
          }
        }
      }      

      drawRing(this.overlayEngine)
    }

    p5.draw = () => {
      p5.clear()
      p5.background(0)
  
      // Set colors
      p5.fill(204, 101, 192, 127)
      p5.stroke(127, 63, 120)
  
      // A rectangle
      p5.rect(40, 120, 120, 40)
  
      let fps = p5.frameRate()
      p5.fill(0, 255, 255, 255)
      p5.stroke(0, 255);
      p5.text("FPS: " + fps.toFixed(2), 10, p5.height - 10)
    }
  }

  saveContext = (divContainer) => {
    // div
    this.divContainer = divContainer
    this.p5Scope = new window.p5(this.handleSketch, this.divContainer)
  }

  saveOverlay = (element) => {
    this.overlayCanvas = element
  }

  render() {
    const topLeftCorner = this.state.topLeftCorner

    const containerStyle = {
      '--zoom-level': this.state.zoomLevel,
      '--pan-x': `${topLeftCorner.x}px`,
      '--pan-y': `${topLeftCorner.y}px`
    }
    const overlayClass = getOverlayClassName(this.state.isOverlayHidden, this.state.isPanning)

    const zoomLevel = this.state.zoomLevel
    const zoomIncrement = this.state.zoomIncrement

    return (
      <div className="main-composer"
        // onMouseUp={this.handleMouseUp}
        >
        <header className="page-header">
          <button className="hide-overlay-btn" onClick={this.hideOverlay}>Hide Overlay</button>
          <button 
            className="zoom-in-btn zoom-btn" 
            onClick={() => performZoom(zoomLevel, zoomIncrement, this.setZoomLevel)
            }>Zoom In</button>
          <button className="zoom-out-btn zoom-btn" 
            onClick={() => performZoom(zoomLevel, -zoomIncrement, this.setZoomLevel)
            }>Zoom Out</button>
        </header>
        <div className="container" style={containerStyle}>
          <div className="basement">
            <ProcessingContainer contextRef={this.saveContext}/>
          </div>
          <div 
            className={overlayClass} 
            // onMouseDown={this.handleMouseDown}
            // onMouseMove={this.handleMouseMove}
            >
            <OverlayElement contextRef={this.saveOverlay} />
          </div>
          {/* <canvas 
            ref={this.overlayCanvas}
            className={overlayClass} 
            // onClick={this.handleMagnify}
            onMouseMove={this.handleMouseMove}
            >
          </canvas> */}
        </div>
      </div>
    )
  }
}