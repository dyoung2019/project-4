console.log('dpi')

const inputWidthElem = document.querySelector('.input-width')
const inputHeightElem = document.querySelector('.input-height')

const outputWidthElem = document.querySelector('.output-width')
const outputHeightElem = document.querySelector('.output-height')

const calculateBtnElem = document.querySelector('.calculate-btn')
const pixelDensityElem = document.querySelector('.pixel-density')
const resultPanelElem = document.querySelector('.result-panel')

const ppiElem = document.querySelector('.ppi')
const documentTypeElem = document.querySelector('.document-type')

const referenceWidthElem = document.querySelector('.reference-width')
const referenceHeightElem = document.querySelector('.reference-height')

const documentPixelDensityElem = document.querySelector('.document-pixel-density')
const documentWidthElem = document.querySelector('.document-width')
const documentHeightElem = document.querySelector('.document-height')

const imgAspectRatioElem = document.querySelector('.img-aspect-ratio')
const docAspectRatioElem = document.querySelector('.doc-aspect-ratio')

const imageWidthElem = document.querySelector('.image-width')
const imageHeightElem = document.querySelector('.image-height')

const fixAspectRatioBtnElem = document.querySelector('.fix-aspect-ratio-btn')
const calculateDocBtnElem = document.querySelector('.calculate-doc-btn')
const docResultPanelElem = document.querySelector('.doc-result-panel')


var pixelDensity = 0

const getAspectRatio = (dimensions) => {
  return dimensions.width / dimensions.height
}

const floatEquivalent = (a, b) => {
  const difference = Math.abs(a - b)
  return difference <= Number.EPSILON
}

const checkInputAndOutput = (input, output) => {
  const widthFactor = output.width / input.width
  const heightFactor = output.height / input.height

  const inputAspectRatio = getAspectRatio(input)
  const outputAspectRatio = getAspectRatio(output)
  const isSameFactor = floatEquivalent(widthFactor, heightFactor)
  const isSameAspectRatio = floatEquivalent(inputAspectRatio, outputAspectRatio)

  // console.log(widthFactor)
  // console.log(heightFactor)
  // console.log(isSameFactor)
  // console.log(inputAspectRatio)
  // console.log(outputAspectRatio)
  // console.log(isSameAspectRatio)

  return (isSameFactor && isSameAspectRatio)
}

const calculatePixelDensity = (input, output) => {
  const widthFactor = output.width / input.width
  const heightFactor = output.height / input.height
  
  return 0.5 * (widthFactor + heightFactor)
}

const getWidthToHeightRatio = (dimensions) => {
  return dimensions.height / dimensions.width
}

const isInvalidInputNumberValue = value => {
  return (value === NaN || value <= 0)
}

const getInputDimensions = () => {
  let inputWidth = Number(inputWidthElem.value)
  let inputHeight = Number(inputHeightElem.value)

  if (isInvalidInputNumberValue(inputWidth))
    return null
  
  if (isInvalidInputNumberValue(inputHeight))
    return null

  return {
    width:inputWidth, 
    height: inputHeight
  }
}

const handleClick = () => {
  let outputWidth = Number(outputWidthElem.value)
  let outputHeight = Number(outputHeightElem.value)

  let inputs = getInputDimensions()
  let outputs = {
    width:outputWidth,
    height: outputHeight
  }

  var isValid = checkInputAndOutput(inputs, outputs)

  let density = calculatePixelDensity(inputs, outputs)

  if (isValid) {
    pixelDensity = density
    pixelDensityElem.textContent = pixelDensity

    resultPanelElem.classList.remove('in-error')
    resultPanelElem.classList.add('is-valid')
  } else {
    pixelDensityElem.textContent = 'ERROR' 

    resultPanelElem.classList.add('in-error')
    resultPanelElem.classList.remove('is-valid')
  }
}

calculateBtnElem.addEventListener('click', handleClick)

var referenceDocuments = {
  'A4': {
    name: 'A4',
    width: 8.27, 
    height: 11.69, 
  },
  'Letter': {
    name: 'Letter',
    width: 8.27,
    height: 11, 
  },
}



const getSelectedReferenceDocument = () => {
  let ppi = Number(ppiElem.value)
  let documentType =  referenceDocuments[documentTypeElem.value]
  const documentWidth = ppi * documentType.width
  const documentHeight = ppi * documentType.height
  
  return {
    width: documentWidth,
    height: documentHeight
  }
}

const v = () => {
  return referenceDocuments[documentTypeElem.value]
}

const fixVerticalAspectRatio = (inputs, scaleX, referenceDocument) => {
  const widthToHeight = getWidthToHeightRatio(inputs)
  if (widthToHeight === NaN) {
    return null
  }

  const documentRatio = getAspectRatio(referenceDocument)
  if (documentRatio === NaN) {
    return null
  } 

  return scaleX * widthToHeight * documentRatio
}

const handleFixAspectRatio = () => {
  const inputs = getInputDimensions()
  if (inputs === null) {
    console.log('ERROR: input not found')
    return
  }

  const referenceDocument = getSelectedReferenceDocument()
  const scaleX = Number(referenceWidthElem.value)

  const verticalRatio = fixVerticalAspectRatio(inputs, scaleX, referenceDocument)
  if (verticalRatio !== null) {
    referenceHeightElem.value = verticalRatio
  } else {
    console.log('ERROR: fixing vertical aspect ratio')
  }
}

fixAspectRatioBtnElem.addEventListener('click', handleFixAspectRatio)

const calculateImageOutput = (input, scaleX, scaleY, documentInPixels) => {
  const imageWidth = scaleX * documentInPixels.width
  const imageHeight = scaleY * documentInPixels.height

  const imageOutput = {
    width: imageWidth,
    height: imageHeight,
  }

  const density = calculatePixelDensity(input, imageOutput)
  imageOutput.pixelDensity = density

  return imageOutput
}

const handleDocClick = () => {
  let input = getInputDimensions()



  // console.log(input)
  // console.log(documentType)
  const referenceDocument = getSelectedReferenceDocument()

  const scaleX = referenceWidthElem.value 
  const scaleY = referenceHeightElem.value

  let imageOutput = calculateImageOutput(input, scaleX, scaleY, referenceDocument)

  // DISPLAY INFO
  imgAspectRatioElem.textContent = getAspectRatio(input)
  docAspectRatioElem.textContent = getAspectRatio(referenceDocument)

  documentWidthElem.textContent = referenceDocument.width
  documentHeightElem.textContent = referenceDocument.height

  imageWidthElem.textContent = imageOutput.width
  imageHeightElem.textContent = imageOutput.height

  if (!!imageOutput.pixelDensity) {
    documentPixelDensityElem.textContent = imageOutput.pixelDensity

    docResultPanelElem.classList.remove('in-error')
    docResultPanelElem.classList.add('is-valid')
  } else {
    documentPixelDensityElem.textContent = 'ERROR' 

    docResultPanelElem.classList.add('in-error')
    docResultPanelElem.classList.remove('is-valid')
  }
}

calculateDocBtnElem.addEventListener('click', handleDocClick)

