export default function paintTransparentCheckboardPattern(bkgd, w, h) {
  const squareSize = 35
  const noOfColumns = Math.ceil(w / squareSize)
  const noOfRows = Math.ceil(h / squareSize)

  bkgd.noStroke()
  for (let i = 0; i < noOfColumns; i++) {
    for (let j = 0; j < noOfRows; j++) {
      if ((i + j) % 2 === 0) {
        bkgd.fill(0, 0); // transparent
      } else {
        bkgd.fill(160, 255); // white
      }
      bkgd.rect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
  }
}