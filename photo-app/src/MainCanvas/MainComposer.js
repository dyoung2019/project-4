import React from 'react'
import './MainComposer.css'
import ProcessingContainer from './ProcessingContainer'
import drawRedRectSketch from './p5/drawRedRectSketch'

const convertToElementCoords = (rect, clientX, clientY) => {
  const ix = clientX - rect.left //x position within the element.
  const iy = clientY - rect.top  //y position within the element.
  return [ix, iy]
}

const pickOverlayCoords = (e) => {
  const target = e.target
  const rect = target.getBoundingClientRect();
  return convertToElementCoords(rect, e.clientX, e.clientY)
} 

export default class MainComposer extends React.Component {
  constructor() {
    super()
    this.state = {
      isOverlayOn: true,
      zoomLevel: 1,
      zoomIncrement: 0.1,
      isPanning: false,
      topLeftCorner: {x : 0, y : 0},
      lastMousePosition: {x : 0, y : 0}
    }
    this.mainComp = React.createRef();
    this.divContainer = null
    this.p5Scope = null
  } 

  // componentDidMount() {
  //   this.mainComp = React.createRef();
  // }

  hideOverlay = () => {
    const setIsOverlayOn = (isVisible) => {
      this.setState({ isOverlayOn : isVisible })
    }

    setIsOverlayOn(!this.state.isOverlayOn)
  }

  setZoomLevel = (level) => {
    if (level > 0.1 && level < 5) {
      this.setState({zoomLevel: level})
    }
  }

  handleZoomIn = () => {
    const level = this.state.zoomLevel + this.state.zoomIncrement
    this.setZoomLevel(level)
  } 
  
  handleZoomOut = () => {
    const level = this.state.zoomLevel - this.state.zoomIncrement
    this.setZoomLevel(level)
  }  

  pickCanvasCoords = (e) => {
    const zoomLevel = this.state.zoomLevel
    console.log(this.mainComp)
    const canvasRect = this.mainComp.current.getBoundingClientRect()
    const [ix, iy] = convertToElementCoords(canvasRect, e.clientX, e.clientY)
  
    const sx = zoomLevel * ix
    const sy = zoomLevel * iy
  
    return [sx, sy]
  } 

  handleMagnify = (event) => {
    // console.log('raw', event.x, event.y)
  
    // const [ox, oy] = pickOverlayCoords(event)
    // console.log('over', ox, oy)
  
    // const [sx, sy] = this.pickCanvasCoords(event)
    // console.log('inside-scale', sx, sy)
  }

  // handlePicking = (e) => {
  //   // console.log('main', e.x, e.y)
  
  //   // const [sx, sy] = this.pickCanvasCoords(e)
  
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
    const lastMousePosition = { x, y }
    this.setState({ lastMousePosition })
  }

  panCanvas = (x1, y1, x2, y2) => {
    let deltaX = x1 - x2 
    let deltaY = y1 - y2 
    
    // application state 
    this.setScrollPosition(deltaX, deltaY)
  }  

  getLastMousePosition = () => {
    const lastMousePosition = this.state.lastMousePosition
    return [lastMousePosition.x, lastMousePosition.y]
  }

  handleMouseMove = e => {
    // Update values on pan/scroll
    if (this.state.isPanning) {
      const [x1, y1] = this.getLastMousePosition()
      const [x2, y2] = pickOverlayCoords(e)
      this.panCanvas(x1, y1, x2, y2)
      this.setLastMousePosition(x2, y2)
    }
  }

  setIsPanning = (isPanning) => {
      this.setState({ isPanning })
  }

  enablePanning = (isPanning) => {
    this.setIsPanning(isPanning)
    if (!isPanning) {
      this.setLastMousePosition(0, 0)
    }
  }

  handleMouseDown = e => {
    // begin pan/scrolling
    const [x2, y2] = pickOverlayCoords(e)
    this.setLastMousePosition(x2, y2)
    this.enablePanning(true)
  }  

  handleMouseUp = e => {
    //  end pan/scrolling
    if (this.state.isPanning) {
      const [x1, y1] = this.getLastMousePosition()
      const [x2, y2] = pickOverlayCoords(e)
      this.panCanvas(x1, y1, x2, y2);
      this.enablePanning(false)
    }
  }  

  getOverlayClassName = () => {
    let classNames = ['overlay']

    if (!this.state.isOverlayOn) {
      classNames.push('hide-layer')
    }

    if (this.state.isPanning) {
      classNames.push('is-panning')
    } 

    return classNames.join(' ')
  }

  saveContext = (divContainer) => {
    // div
    this.divContainer = divContainer
    this.p5Scope = new window.p5(drawRedRectSketch, this.divContainer)
  }

  render() {
    const topLeftCorner = this.state.topLeftCorner

    const containerStyle = {
      '--zoom-level': this.state.zoomLevel,
      '--pan-x': `${topLeftCorner.x}px`,
      '--pan-y': `${topLeftCorner.y}px`
    }
    const overlayClass = this.getOverlayClassName()

    return (
      <div className="main-composer"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        >
        <header className="page-header">
          <h1>HELLO WORLD</h1>
          <button className="hide-overlay-btn" onClick={this.hideOverlay}>Hide Overlay</button>
          <button className="zoom-in-btn zoom-btn" onClick={this.handleZoomIn}>Zoom In</button>
          <button className="zoom-out-btn zoom-btn" onClick={this.handleZoomOut}>Zoom Out</button>
        </header>
        <div className="container" style={containerStyle}>
          <div className="basement">
            {/* <main 
              className="main-comp" 
              ref={this.mainComp} 
              // onClick={this.handlePicking}
              >
              
            </main> */}
            <ProcessingContainer contextRef={this.saveContext}/>
          </div>
          <canvas 
            className={overlayClass} 
            onClick={this.handleMagnify}
            onMouseMove={this.handleMouseMove}
            >
          </canvas>
        </div>
      </div>
    )
  }
}