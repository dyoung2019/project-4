import CompositeLayer from './CompositeLayer'

const createSource = (pScope, width, height) => {
  const sourceImage_1 = pScope.createGraphics(width, height)

  return sourceImage_1
}

const createVectorMask = (pScope, width, height) => {
  const sourceImage_1 = pScope.createGraphics(width, height)
  // sourceImage_1.elt.id = "layer_2_src"

  sourceImage_1.attribute('resize', 'true')
  sourceImage_1.attribute('hidpi', 'false')
  return sourceImage_1
}

export function insertNewLayersIntoCollection(actions, layerCollection, pScope, width, height){
  actions.forEach(action => {
    const {destinationIndex, sortLayerId} = action
    console.log(`ADD ${destinationIndex} ${sortLayerId}`)

    const source = createSource(pScope, width, height)

    // vector mask - paper.js
    const vectorMask = createVectorMask(pScope, width, height)

    let composite = new CompositeLayer(sortLayerId, source, vectorMask)
    layerCollection[destinationIndex] = composite
  })
}