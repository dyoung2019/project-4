const divContainer = document.querySelector(".container")
const saveImageBtn = document.querySelector('.save-image-btn')

let c;
const sketch = (p) => {
  let img; // Declare variable 'img'.

  p.setup = () => {
    c = p.createCanvas(900, 900);
    img = p.loadImage('assets/image.png'); // Load the image
  }
  
  p.draw = () => {

    let c = p.color('coral')
    p.background(c)
    // Displays the image at its actual size at point (0,0)
   // p.image(img, 0, 0);
    // Displays the image at point (0, height/2) at half size
    p.image(img, 0, p.height / 2, p.width, p.height);
  }
}

const myp5 = new p5(sketch, divContainer);

const handleClick = () => {
  console.log('save img')
  myp5.save('mycanvas.jpg')
}

saveImageBtn.addEventListener('click', handleClick)