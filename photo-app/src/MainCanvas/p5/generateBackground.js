export default function generateBackground (p, w, h) {
  let bkgd  = p.createGraphics(w,h);
  // draw some stuff.
  bkgd.background(255,0,0);
  bkgd.stroke(255, 204, 0);
  
  for(var i = 0; i < p.width + 10; i += 10) {
    bkgd.strokeWeight(i/40)
    bkgd.line(i,0,i,400);
  }
  return bkgd
}