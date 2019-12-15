const paperContainer = document.querySelector('.paper-container')
const p5Canvas = document.querySelector('.p5-container .p5-canvas')

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

  console.log('done')
}

let sketch = (p) => {
  var layer_1;
  var layer_0;

  // debugger
  var generateBackground = (w, h) => {
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

  p.setup = () => {
    let w = 150
    let h = 150

    p.createCanvas(w, h);
    // p.background(220);

    // create a p5.Graphics containing the image that will be masked
    layer_1 = p.createGraphics(w,h);
    layer_1.elt.id = "layer_1"
    // layer_1.elt.('resize');
    paperContainer.style.width = w
    paperContainer.style.height = h

    layer_1.attribute('resize', 'true')
    layer_1.attribute('hidpi', 'true')
    layer_1.addClass('paper-canvas')
    layer_1.parent(paperContainer)

    // const paperCanvas = document.querySelector('.paper-container .paper-canvas')
    loadPaper(layer_1.elt)

    layer_0 = generateBackground(w, h)
    layer_0.elt.id = "layer_0"
  }

  p.draw = () => {
    // p.clear()
    // STEP 0: clear background color on canvas
  //  p.background(220)
    
    // overlay
    // p.background(0);

    let opacity = 65
    // STEP 1: layer 1 must be clear
    // layer_1.clear()
    // p.background(0);
    // STEP 2: COLOR IS SET ON p5 instance
    p.fill(255, 255, 255, opacity);
    // STEP 3: Draw here on layer
    //layer_1.ellipse(p.mouseX, p.mouseY, 250);

    /*
    // let mergeLayers = composeImages(layer_0, layer_1)
    // STEP 4A: create sub image of src image
    let subImage = layer_0.get(0, 0, layer_0.width, layer_0.height)
    // STEP 4B: create sub image of mask (OPTIONAL)
    let subMask  = layer_1.get(0, 0, layer_1.width, layer_1.height)
    // let localMask = createMask(layer_1)
  
    // STEP 5: apply mask of subimage (copy), so src image is not updated
    subImage.mask(subMask)
    // debugger
    // p.image(subImage, 0, 0)
    */
    p.image(layer_1, 0, 0)
    // STEP 6: apply layer's blend mode
    //let blendMode = p.BLEND
    //p.blendMode(blendMode)
    // STEP 7: draw main canvas
   // p.image(subImage, 0, 0)
    // STEP 8: reset blend mode
    // p.blendMode(p.BLEND)
  };
};


let myp5 = new p5(sketch, p5Canvas);

// const paperCanvas = document.querySelector('.paper-container .paper-canvas')
// loadPaper(paperCanvas)


