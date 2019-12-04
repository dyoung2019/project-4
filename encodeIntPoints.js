// https://docs.microsoft.com/en-us/bingmaps/rest-services/elevations/point-compression-algorithm?redirectedfrom=MSDN
function encodeIntPoints(points) {  
  var latitude = 0;  
  var longitude = 0;  
  var result = [];   
  var l;  

  for (var point in points ) {  

    // step 2  
    // var newLatitude = Math.round(points[point][0] * 100000);  
    var newLatitude = Math.round(points[point][0]);  
    // var newLongitude = Math.round(points[point][1] * 100000);  
    var newLongitude = Math.round(points[point][1]);  

    // step 3  
    var dy = newLatitude - latitude;  
    var dx = newLongitude - longitude;  
    latitude = newLatitude;  
    longitude = newLongitude;  

    // step 4 and 5  
    dy = (dy << 1) ^ (dy >> 31);  
    dx = (dx << 1) ^ (dx >> 31);  

    // step 6  
    var index = ((dy + dx) * (dy + dx + 1) / 2) + dy;  

    while (index > 0) {  

      // step 7  
      var rem = index & 31;  
      index = (index - rem) / 32;  

      // step 8  
      if (index > 0) rem += 32;  

      // step 9  
      result.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"[rem]);  
    }  
  }  

  // step 10  
  return result.join("");  
}  

module.exports = encodeIntPoints