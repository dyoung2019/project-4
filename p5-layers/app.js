
let sketch = (p, options) => {
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
    let w = 400
    let h = 400

    p.createCanvas(w, h);
    p.background(220);

    // create a p5.Graphics containing the image that will be masked
    layer_1 = p.createGraphics(w,h);
    layer_0 = generateBackground(w, h)
  }

  var createMask = (_mask) => {
    let img = p.createImage(_mask.width,_mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    //load pixels
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
      // 0 red, 1 green, 2 blue, 3 alpha
      // Assuming that the mask image is in grayscale,
      // the red channel is used for the alpha mask.
      // the color is set to black (rgb => 0) and the
      // alpha is set according to the pixel brightness.
      var v = img.pixels[i];
      img.pixels[i] = 0;
      img.pixels[i+1] = 0;
      img.pixels[i+2] = 0;
      img.pixels[i+3] = v;
    }
    img.updatePixels();    
    return img
  }

  var composeImages = (_content, _mask) => {

    //Create the mask as image
    let img = p.createImage(_mask.width,_mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    //load pixels
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
      // 0 red, 1 green, 2 blue, 3 alpha
      // Assuming that the mask image is in grayscale,
      // the red channel is used for the alpha mask.
      // the color is set to black (rgb => 0) and the
      // alpha is set according to the pixel brightness.
      var v = img.pixels[i];
      img.pixels[i] = 0;
      img.pixels[i+1] = 0;
      img.pixels[i+2] = 0;
      img.pixels[i+3] = v;
    }
    img.updatePixels();
    
    //convert _content from pg to image
    let contentImg = p.createImage(_content.width,_content.height);
    contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
    // create the mask
    contentImg.mask(img)
    // return the masked image
    return contentImg;
  }

  p.draw = () => {
    // p.clear()
    // STEP 0: clear background color on canvas
    p.background(220)
    
    // overlay
    // p.background(0);

    let opacity = 65
    // STEP 1: layer 1 must be clear
    layer_1.clear()
    // p.background(0);
    // STEP 2: COLOR IS SET ON p5 instance
    p.fill(255, 255, 255, opacity);
    // STEP 3: Draw here on layer
    layer_1.ellipse(p.mouseX, p.mouseY, 250);

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
    // STEP 6: apply layer's blend mode
    let blendMode = p.BLEND
    p.blendMode(blendMode)
    // STEP 7: draw main canvas
    p.image(subImage, 0, 0)
    // STEP 8: reset blend mode
    // p.blendMode(p.BLEND)
  };
};


let myp5 = new p5(sketch, ".container", "hello");

// Compare to "global mode"
// let x = 100;
// let y = 100;

// function setup() {
//   createCanvas(200,200);
// }

// function draw() {
//   background(0);
//   fill(255);
//   ellipse(x,y,50,50);
// }
