export default function convertToRGBAHex(colorRGBA) {
  const to2DigitHex = (component) => {
    return component.toString(16).padStart('0').toLowerCase()
  }

  const alpha = Math.floor(colorRGBA.a * 255) || 255

  return `#${to2DigitHex(colorRGBA.r)}${to2DigitHex(colorRGBA.g)}${to2DigitHex(colorRGBA.b)}${to2DigitHex(alpha)}`
}