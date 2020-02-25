export default function insertEditablePointAtEndOfPath (endPoint, path, point) {
  if (endPoint === null) {
    endPoint = path.add(point)
    endPoint.selected = true;
  }
  return endPoint
}