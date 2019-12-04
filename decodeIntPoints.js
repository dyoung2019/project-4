// https://docs.microsoft.com/en-us/bingmaps/spatial-data-services/geodata-api
function decodeIntPoints(value)  
{  
  // NOTE seems to be a base64 encoding scheme
  const safeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-" 
  let list = [];  
  let index = 0;  
  let xsum = 0
  let ysum = 0;  

  const valueLength = value.length

  while (index < valueLength) {       // While we have more data,  
    
    let n = 0;                     // initialize the accumulator  
    let k = 0;                      // initialize the count of bits  
    let factor = 1 << 30
    // let tokens = []
    while (true) {  
      if (index >= valueLength) {
        // If we ran out of data mid-number  
        // indicate failure.  
        return {
          success: false,
        }
      }

      let b = safeCharacters.indexOf(value[index++]);  
      // console.log(`index[${index}] - ${b}`)
      if (b == -1) {
        // If the character wasn't on the valid list,  
        // indicate failure. 

        return {
          success: false,
        }
      } 
      let lowerBits = (b & 31)
      // console.log(lowerBits)
      // << are 32 bit operation only
      let canUse32BitwiseOperations = k < 30
      if (canUse32BitwiseOperations) {
        n |= lowerBits << k;   // mask off the top bit and append the rest to the accumulator  
      } else {
        // console.log(`factor : ${factor}`)
        n += lowerBits * factor
        factor *= 32
      }
      // tokens.push(lower_bit)

      k += 5;                     // move to the next position  
      if (b < 32) break;          // If the top bit was not set, we're done with this number.  
    }  
    // console.log(n)
    // console.log(tokens)

    // The resulting number encodes an x, y pair in the following way:  
    //  
    //  ^ Y  
    //  |  
    //  14  
    //  9 13  
    //  5 8 12  
    //  2 4 7 11  
    //  0 1 3 6 10 ---> X  

    // https://math.stackexchange.com/questions/1417579/largest-triangular-number-less-than-a-given-natural-number

    let triangleLookup = (1 + Math.sqrt(8 * n + 1)) / 2
    let largestCompleteTriangle = Math.floor(triangleLookup)
    let sumOfLatAndLong = largestCompleteTriangle - 1
    let elementsInTriangles = (sumOfLatAndLong * largestCompleteTriangle) / 2
    let xDelta = n - elementsInTriangles

    // console.log(`n : ${n}`)
    // console.log(`triangleLookup : ${triangleLookup}`)
    // console.log(`largestCompleteTriangle : ${largestCompleteTriangle}`)
    // console.log(`sumOfLatAndLong : ${sumOfLatAndLong}`)
    // console.log(`elementsInTriangles : ${elementsInTriangles}`)
    // console.log(`latDelta : ${latDelta}`)

    // // determine which diagonal it's on  
    // let diagonal = Math.floor(((Math.sqrt(8 * n + 5) - 1) / 2))  

    // // subtract the total number of points from lower diagonals  
    // n -= diagonal * (diagonal + 1) / 2  

    // get the X and Y from what's left over  
    let nx = xDelta 
    let ny = sumOfLatAndLong - xDelta

    // console.log(`nx 0 : ${nx}`)
    // console.log(`ny 0 : ${ny}`)

    // undo the sign encoding  
    nx = (nx >> 1) ^ -(nx & 1)  
    ny = (ny >> 1) ^ -(ny & 1)  

    // console.log(`nx 1 : ${nx}`)
    // console.log(`ny 1 : ${ny}`)

    // undo the delta encoding  
    xsum += nx;  
    ysum += ny;  

    // position the decimal point  
    // let coord = [xsum * 0.00001, ysum * 0.00001]
    let coord = [xsum, ysum]

    // console.log(coord)
    list.push(coord)
  }  

  // debugger

  return {
    points: list,
    success: true
  }
} 

module.exports = decodeIntPoints