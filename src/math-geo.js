"use strict";
module.exports = {
	centerGroup: function(arr){
		let lat_sum = 0
		let lon_sum = 0
		for (var i = 0;i<arr.length; i++){
			lat_sum += arr[i].lat
			lon_sum += arr[i].lon
		}
		return [ (lat_sum/i), (lon_sum/i) ]
	},
	euclidean: function(geo1, geo2){
  		let lat_sum = (geo1[0]-geo2[0])
  		let lon_sum = (geo1[1]-geo2[1])
  		let summary = (lat_sum)**2 + (lon_sum)**2
  		return Math.sqrt(summary)
	},
	distanceMeter: function(geo1, geo2) {
  		const R = 6371e3; // รัสมีของโลก 6371 กม
  		const lat1 = geo1[0] * Math.PI / 180; // φ, λ in radians
  		const lat2 = geo2[0] * Math.PI / 180;
  		const deltaLat = (geo2[0] - geo1[0]) * Math.PI / 180;
  		const deltaLon = (geo2[1] - geo1[1]) * Math.PI / 180;

  		const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    			Math.cos(lat1) * Math.cos(lat2) *
    			Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  		const d = R * c; // in metres
  		return d
	}
}

// Example
/*
var arr = [
  {
    lat: 13.885088,
    lon: 100.5096912
  },
  {
    lat: 13.885286,
    lon: 100.5075243
  },
  {
    lat: 13.885286,
    lon: 100.5075243
  }
];
 
var centroid = centerGroup(arr)
console.log(centroid) 

console.log(distanceMeter([13.8839236,100.512085],[13.885088,100.5096912]))

*/
