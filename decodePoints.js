
// https://docs.microsoft.com/en-us/bingmaps/spatial-data-services/geodata-api
function decodePoints(value)  
{  
    const safeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-" 
    let list = [];  
    let index = 0;  
    let xsum = 0
    let ysum = 0;  
  
    while (index < value.Length) {       // While we have more data,  

      let n = 0;                     // initialize the accumulator  
      let k = 0;                      // initialize the count of bits  
  
      while (true) {  
        if (index >= value.Length) {
          // If we ran out of data mid-number  
          // indicate failure.  
          return {
            success: false,
          }
        }

        let b = safeCharacters.indexOf(value[index++]);  

        if (b == -1) {
          // If the character wasn't on the valid list,  
          // indicate failure. 

          return {
            success: false,
          }
        } 

        n |= (b & 31) << k;   // mask off the top bit and append the rest to the accumulator  
        k += 5;                     // move to the next position  
        if (b < 32) break;          // If the top bit was not set, we're done with this number.  
      }  
  
       // The resulting number encodes an x, y pair in the following way:  
       //  
       //  ^ Y  
       //  |  
       //  14  
       //  9 13  
       //  5 8 12  
       //  2 4 7 11  
       //  0 1 3 6 10 ---> X  
  
       // determine which diagonal it's on  
       let diagonal = Math.floor(((Math.sqrt(8 * n + 5) - 1) / 2))  
  
       // subtract the total number of points from lower diagonals  
       n -= diagonal * (diagonal + 1) / 2  
  
       // get the X and Y from what's left over  
       let ny = Math.floor(n) 
       let nx = diagonal - ny  
  
      // undo the sign encoding  
      nx = (nx >> 1) ^ -(nx & 1)  
      ny = (ny >> 1) ^ -(ny & 1)  

      // undo the delta encoding  
      xsum += nx;  
      ysum += ny;  

      // position the decimal point  
      list.push([ysum * 0.00001, xsum * 0.00001])
    }  
  
    return {
      points: list,
      success: true
    }
}

module.exports = decodePoints