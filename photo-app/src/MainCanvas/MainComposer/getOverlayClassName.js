export default function getOverlayClassName (isOverlayHidden, isPanning) {
  let classNames = ['overlay']

  if (isOverlayHidden) {
    classNames.push('hide-layer')
  }

  if (isPanning) {
    classNames.push('is-panning')
  } 

  return classNames.join(' ')
}