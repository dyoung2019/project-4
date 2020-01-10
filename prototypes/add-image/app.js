const divContainer = document.querySelector(".container")
const saveImageBtn = document.querySelector('.save-file-dialog button')

const compWidth = 900
const compHeight = 900

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

  p.setup = () => {
    // 1 x 1 for custom resolution
    p.pixelDensity(1)
    // TODO : something else for print dpi
    c = p.createCanvas(compWidth, compHeight);
    const imageName = 'image.png'
    const imagePath = 'assets/image.png'

    const onImageLoad = img => {
      let imgInfo = generateImageSource(1, imageName, imagePath, img.width, img.height)
      currentComp.assets.push(imgInfo)
    }

    img = p.loadImage(imagePath, onImageLoad, onImageLoadError)
  }
  
  p.draw = () => {

    let bkgdColor = p.color('coral')
    p.background(bkgdColor)
    // Displays the image at its actual size at point (0,0)
   // p.image(img, 0, 0);
    // Displays the image at point (0, height/2) at half size
    p.image(img, 0, p.height / 2, p.width, p.height);
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


