export default function clampZoomLevel (level) {
  // zoom level of 10%
  if (level < 0.1)
    return 0.1

  // zoom level of 500%
  if(level > 5) {
    return 5
  }

  return level;
}