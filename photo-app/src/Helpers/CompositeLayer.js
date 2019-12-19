import paper from 'paper'

export default class CompositeLayer {
  constructor(sortLayerId, source, mask) {
    this.sortLayerId = sortLayerId
    this.source = source
    this.mask = mask
    this.paperScope = null
    if (this.mask !== null) {
      this.paperScope = new paper.PaperScope()
      this.paperScope.setup(this.mask.elt)
      this.paperScope.view.draw()
    }
  }

  destroy() {
    this.source.remove()
    this.source = null
    this.mask.remove()
    this.mask = null
    this.paperScope = null
  }
}