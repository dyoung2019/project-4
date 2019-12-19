export default function destroyUnnecessaryLayersFromCollection(actions, layersBefore){
  actions.forEach(action => {
    const {sourceIndex} = action
    let deleteItem = layersBefore[sourceIndex]
    deleteItem.destroy()
    layersBefore[sourceIndex] = null
  })
}