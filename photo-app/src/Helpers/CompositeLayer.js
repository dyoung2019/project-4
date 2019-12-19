export default class CompositeLayer {
  constructor(sortLayerId, source, mask) {
    this.sortLayerId = sortLayerId
    this.source = source
    this.mask = mask
  }

  destroy() {
    this.source.remove()
    this.source = null
    this.mask.remove()
    this.mask = null
  }
}