"use strict";
module.exports = function naiveSearchMatch(pat, txt) 
{ 
    let M = pat.length; 
    let N = txt.length; 
  
    for (var i = 0; i <= N - M; i++) 
    { 
        for (var j = 0; j < M; j++) 
            if (txt[i + j] != pat[j]) 
                break; 
    	if (j == M){
            console.log("Pattern found at index "+i);
            return true;
        }
    } 
    return false;
} 

// │module.exports = 

// Example
//var txt = "Hello World Tha"
//var pat = "Tha"
//search(pat, txt)

