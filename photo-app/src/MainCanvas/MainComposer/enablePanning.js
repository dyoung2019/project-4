export default function enablePanning (setIsPanning, setLastMousePosition, value) {
  setIsPanning(value)
  if (!value) {
    setLastMousePosition(0, 0)
  }
}