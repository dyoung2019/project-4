import convertToElementCoords from './convertToElementCoords'

export default function pickOverlayCoords (event) {
  const target = event.target
  const rect = target.getBoundingClientRect()
  return convertToElementCoords(rect, event.clientX, event.clientY)
} 