import React from 'react';
import paper from 'paper'
import './App.css';

// Get a reference to the canvas object
const loadPaper = (pScope) => {
  // Create an empty project and a view for the canvas:

  // Create a Paper.js Path to draw a line into it:
  var path = new pScope.Path();
  path.strokeColor = 'black';
  path.add(new pScope.Point(30, 75)); 
  path.add(new pScope.Point(30, 25)); 
  path.add(new pScope.Point(80, 25));
  path.add(new pScope.Point(80, 75));
  path.closed = true;

  // Select the path, so we can see its handles:
  path.fullySelected = true;
  
  // Create a copy of the path and move it 100pt to the right:
  // var copy = path.clone();
  var copy = new pScope.Path()
  // copy.add(new pScope.Point(130, 75)); 
  // copy.add(new pScope.Point(130, 25)); 
  copy.fullySelected = true;
  // copy.position.x += 100;
  
  // Smooth the segments of the copy:
  // copy.smooth();

  var tool = new pScope.Tool();
  // var scribble = new pScope.Path();
  // scribble.strokeColor = 'green';
  // var center = pScope.view.center

  // scribble.add(center)

  // var printInfo = (ptA, ptB) => {
  //   var pointA = [ptA.x, ptA.y]
  //   var pointB = [ptB.x, ptB.y]
  //   var angle = calculateAngleFromPoint(pointA, pointB)
  //   console.log('mouse down :' + event.point);
  //   console.log('angle :' + angle);
  // }

  // var endPoint = copy.segments[0]
  var endPoint = null
  
  function pullHandles(segment, point) {
    let dx = segment.point.x - point.x
    let dy = segment.point.y - point.y

    endPoint.handleIn = new pScope.Point(dx, dy)
    endPoint.handleOut = new pScope.Point(-dx, -dy)
  }

  let isExtendingHandles = false
  // scribble.add(center);
  // Define a mousedown and mousedrag handler
  tool.onMouseDown = function(event) {
    // endPoint.handleIn = event.point
    //pullHandles(endPoint, event.point)
    // if (!isExtendingHandles) {
    //   endPoint = copy.add(event.point)
    // }

    // printInfo(event.point)
    // let noOfSegments = copy.segments.length
    // console.log(noOfSegments)
    // copy.add(event.point)

    // endPoint = copy.segments[0]
    if (endPoint == null) {
      let seg = copy.add(event.point)
      // console.log("Array : " + seg)
      seg.selected = true;
      endPoint = seg
    }

    isExtendingHandles = true
    // console.log('mouse down')
    return false
  }

  tool.onMouseDrag = function(event) {
    if (!!endPoint) {
      // if (copy.segments.length === 1) {
        pullHandles(endPoint, event.point)
      // }
    // endPoint.handleOut = editHandleDirectly(event, endPoint)
    // endPoint.handleIn = editHandleIndirect(event, endPoint)
    // console.log('mouse drag :' + event.point);
    // printInfo(event.point)
    }
  }

  tool.onMouseUp = function(event) {
    console.log('mouse up :' + event.point);
    isExtendingHandles = false
    endPoint = null
  }

  tool.onKeyDown = function(event) {
    if (event.key == 'space') {
        // Scale the path by 110%:
        // scribble.strokeColor = 'blue' 
        // Prevent the key event from bubbling
        return false;
    }
  }

  tool.onKeyUp = function(event) {
    if (event.key == 'space') {
      // Scale the path by 110%:
      // scrsibble.strokeColor = 'green' 
      // Prevent the key event from bubbling
      return false;
    }
  }

  pScope.view.draw()
}

class App extends React.Component {
  componentDidMount = () => {
    const canvasElem = this.myCanvas

    this.maskScope = new paper.PaperScope()
    this.maskScope.setup(canvasElem)
    loadPaper(this.maskScope)
  }

  render() {
    return (
      <div className="App">
        <h1>Drawing Box</h1>
        <div>
          <div className="drawing-box">
            <canvas ref={el => this.myCanvas = el} resize/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
