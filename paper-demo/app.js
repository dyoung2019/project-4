var paperLayer = document.querySelector('.paper-layer')

// Get a reference to the canvas object
var loadPaper = (canvas) => {
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

loadPaper(paperLayer)