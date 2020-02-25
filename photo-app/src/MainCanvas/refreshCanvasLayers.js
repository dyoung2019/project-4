import { insertNewLayersIntoCollection } from '../Helpers/insertNewLayersIntoCollection'
import destroyUnnecessaryLayersFromCollection from '../Helpers/destroyUnnecessaryLayersFromCollection'
import figureOutLayerChanges from '../Helpers/figureOutLayerChanges'

export default function refreshCanvasLayers (layersBefore, layerAfters, pScope, width, height) {
  const [layersCollection, adds, deletes] = figureOutLayerChanges(layersBefore, layerAfters)
  if (pScope !== null) {
    insertNewLayersIntoCollection(adds, layersCollection, pScope, width, height)
    // TODO: adjust canvas to size

    destroyUnnecessaryLayersFromCollection(deletes, layersBefore)
  }

  return layersCollection
}