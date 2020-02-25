export default function convertToElementCoords (rect, clientX, clientY) {
  const ix = clientX - rect.left //x position within the element.
  const iy = clientY - rect.top  //y position within the element.
  return [ix, iy]
}