"use strict"; 
  const pivot = (arr, start = 0, end = arr.length + 1) => {
    const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];
  
    let pivot = arr[start],
        pointer = start;
  
    for (let i = start; i < arr.length; i++) {
      if (arr[i][0] < pivot[0]  ) {
        pointer++;
        swap(arr, pointer, i);
      }
    };
    swap(arr, start, pointer);
  
    return pointer;
  }
  
  const quickSort = (arr, start = 0, end = arr.length) => {
    let pivotIndex = pivot(arr, start, end);
  
    if (start >= end) return arr;
    quickSort(arr, start, pivotIndex);
    quickSort(arr, pivotIndex + 1, end);
  
    return arr;
  };
  
  function euclidean(geo1, geo2){ 
    let lat_sum = (geo1.lat-geo2.lat)
    let lon_sum = (geo1.lon-geo2.lon)
    let summary = (lat_sum)**2 + (lon_sum)**2
    return Math.sqrt(summary)
  }
  
  
  function RemoveNode(arr,id) {
      return arr.filter(function(data) {
          if (data.id == id) {
              return false;
          }
          return true;
      });
  }
  
  module.exports = function knnF(geoArray, limit){
    let arr = geoArray
    /* for (var i = 0; i<arr.length;i++){
      console.log(euclidean(arr[0], arr[i]))
    } */
    delete arr[0]
    //console.log(arr)
    return knnG(arr, [], limit)
  }
  
  const limitLocation = (arr, limit) => {
    let disResult = []
    for (let i = 0; i<limit; i++) {
      disResult[i] = [
        arr[i]
      ]
    }
    return disResult
  }
  
  /*
  
  */
 function knnG(geoArray, groupArray, limit){
    let arr = geoArray.filter(value => Object.keys(value).length !== 0);
    if (groupArray.length === 0) {
      var x = 0
    }else{
      var x = groupArray.length
    }
    let arr_group = groupArray
    let disResult = []
    for (var i = 0; i<arr.length;i++){
      disResult[i] = [
        euclidean(arr[0], arr[i]),
        arr[i].id
      ]
    }
    //console.log(arr)
    disResult = quickSort(disResult)
    arr_group[x] = limitLocation(disResult, limit)
    for (let r = 0; r < arr_group[x].length; r++) {
      arr = RemoveNode(arr, arr_group[x][r][0][1]);
    }
    if (arr.length > 0){
      knnG(arr, arr_group, limit)
    }
    return arr_group
  }
  
