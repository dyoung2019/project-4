const buildExistingLayersLookup = (layers) => {
  const result = {}
  layers.forEach((layer, i) => {
    result[layer.sortLayerId] = i
  })
  return result
}

const extractRemainingLayers = (lookup) => {
  const layersToDelete = Object.entries(lookup).map(el => {
    const [ sortLayerId, index ] = el
    return { sortLayerId: sortLayerId, sourceIndex: index }
  })
  return layersToDelete
}

const pushAddAction = (destination, sortLayerId, i) => {
  const action = {sortLayerId: sortLayerId, destinationIndex: i}
  // create new layer with p5 + paper.js
  destination.push(action)
}

const pushPlaceholderOnCollection = (layerCollection) => {
  layerCollection.push(null)
}

const pushExistingLayerOntoCollection = (layersBefore, existingLayerArrayIndex, layerCollection) => {
  const existingLayer = layersBefore[existingLayerArrayIndex]
  layerCollection.push(existingLayer)
}

const removeSelectedLayerFromLookup = (sortLayerId, lookup) => {
  delete lookup[sortLayerId]
}

export default function figureOutLayerChanges(layersBefore, layersAfter) {
  const existingLayersLookup = buildExistingLayersLookup(layersBefore)

  const addActions = []
  const layersCollection = []
  layersAfter.forEach((layer, destinationIndex) => {
    const { sortLayerId }  = layer

    const previousArrayIndex = existingLayersLookup[sortLayerId]
    
    const layerNotFound = previousArrayIndex === undefined

    if (layerNotFound) {
      pushAddAction(addActions, sortLayerId, destinationIndex)
      pushPlaceholderOnCollection(layersCollection)
    } else {
      pushExistingLayerOntoCollection(layersBefore, previousArrayIndex, layersCollection)
      removeSelectedLayerFromLookup(sortLayerId, existingLayersLookup)
    }
  })

  const deleteActions = extractRemainingLayers(existingLayersLookup)

  return [layersCollection, addActions, deleteActions]
}


