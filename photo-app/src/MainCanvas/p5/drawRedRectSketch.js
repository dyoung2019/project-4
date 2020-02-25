export default function handleSketch (p5) {
  p5.setup = () => { 
    p5.createCanvas(400, 400)
  }

  p5.draw = () => {
    p5.clear()
    p5.background(0)

    // Set colors
    p5.fill(204, 101, 192, 127)
    p5.stroke(127, 63, 120)

    // A rectangle
    p5.rect(40, 120, 120, 40)

    let fps = p5.frameRate()
    p5.fill(0, 255, 255, 255)
    p5.stroke(0, 255);
    p5.text("FPS: " + fps.toFixed(2), 10, p5.height - 10)
  }
}