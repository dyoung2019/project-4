const divContainer = document.querySelector(".container")
const saveImageBtn = document.querySelector('.save-file-dialog button')

const compWidth = 500
const compHeight = 500

const generateCompositionFile = (name, width, height) => {
  // lottie file format
  const sampleFile = {
    nm: name,
    v: '5.4.1', // bodymovin version
    fr: 1, // frame rate
    ip: 0, // in-point / first frame
    op: 1, // out-point / last frame
    w: width, // comp width
    h: height, // comp height
    ddd: 0, // is 3d layer comp (false)
    layers: [], // layers info
    assets: [], // assets 
    chars: [],  // chars 
  }
  return sampleFile
}

const currentComp = generateCompositionFile('Sample File', compWidth, compHeight)

const generateImageSource = (sourceId, imageName, imagePath, w, h) => {
  return {
    id: sourceId, // image.id
    p: imageName,
    u: imagePath,
    w: w,
    h: h,
  }
}

const generateTransform = (compWidth, compHeight) => {
  return {

  }
}

const generateImageLayer = (sourceId, layerName, layerIndex) => {
  return {
    nm: layerName,
    ind: layerIndex,
    ty: 2, // type - image layer
    ks: {}, // transform
    ao: 0, // auto-orient along path (false)
    bm: 0, // blend mode
    ddd: 0, // is 3d layer (false)
    // cl: '', // parsed layer name (?!?)
    // ln: '', // layer HTML ID
    ip: 0, // in point of layer - initial frame
    op: 1, // out point of layer - last frame
    st: 0, // start time of layer ?!?
    hasMasks: 0, // false
    maskProperties: [], // list of masks
    ef: [], // lost of effects
    sr: 1, // layer time stretching
    // parent: layer parent; ind of other layer
    refId: sourceId,
  }
}

const onImageLoadError = e => {
  console.log(e)
}

let c;
const sketch = (p) => {
  let img; // Declare variable 'img'.

  const createPPICanvas = (p, pixelDensity) => {
    // 1 x 1 for custom resolution
    // p.pixelDensity(1)
    // // fractional pixel density work too
    // p.pixelDensity(0.5)
    // // very large pixel density should use createGraphics instead
    // p.pixelDensity(7)


    p.pixelDensity(pixelDensity)
    // use offscreen graphics
    return p.createGraphics(compWidth, compHeight)
  }

  p.setup = () => {
    p.createCanvas(compWidth, compHeight)
    // 1 x 1 for custom resolution
    // fractional pixel density work too
    // very large pixel density should use createGraphics instead
    const density = 4.0
    c = createPPICanvas(p, density)
    const imageName = 'image.png'
    const imagePath = 'assets/image.png'

    const onImageLoad = img => {
      let imgInfo = generateImageSource(1, imageName, imagePath, img.width, img.height)
      currentComp.assets.push(imgInfo)
      // c.copy(img, 0, 0, img.width, img.height, 0, c.height / 2, c.width, c.height)
    }

    img = p.loadImage(imagePath, onImageLoad, onImageLoadError)
  }
  
  p.draw = () => {
    p.background('coral')
    // let bkgdColor = p.color('olive')
    // c.background(bkgdColor)
    // Displays the image at its actual size at point (0,0)
    // Displays the image at point (0, height/2) at half size
    p.fill(0, 100, 0)
    //p.tint(0, 153, 204) // Tint blue
    // p.image(img, 0, 0)
    p.ellipse(150,150,100,100)
    
    p.image(img, 0, c.height / 2, c.width, c.height)
    
    let bkgdColor = p.color('olive')
    c.background(bkgdColor)
    c.tint(255, 0, 255, 255);
    c.ellipse(150,150,100,100)
    c.image(img, 0, c.height / 2, compWidth, compHeight)
    // c.image(img, 0, c.height / 2, c.width, c.height);
  }
}

const myp5 = new p5(sketch, divContainer);

const handleSave = e => { 
  const optimizeJSON = false
  const fileName = 'comp.json'

  myp5.saveJSON(currentComp, fileName, optimizeJSON)

  myp5.saveCanvas(c, 'myCanvas', 'jpg')
}

saveImageBtn.addEventListener('click', handleSave)


