import clampZoomLevel from './clampZoomLevel'

export default function performZoom (level, increment, setZoomLevel) {
  const sum = clampZoomLevel(level + increment)
  setZoomLevel(sum)
}