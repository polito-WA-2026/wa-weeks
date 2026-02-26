"use strict";

const v = [-12, -3, 18, 10, 4, -1, 0, 16];

console.log('Original scores: ', v);

// duplicate the array
let v2 = [...v];

v2.sort( (a, b) => a - b);

console.log('Sorted scores: ', v2);

let NN = v2.findIndex( el => el >= 0 ); 

console.log('First non-negative score: ', v2[NN], ' at index ', NN);

v2.splice(0, NN);
v2.shift(); // remove the lowest non-negative score
v2.shift(); // remove the second lowest non-negative score

let avg = 0;
for (const val of v2) {
    avg += val;
}
avg = Math.round(avg / v2.length);

console.log('Average of the remaining scores: ', avg);

const addedArray = new Array(NN + 2).fill(avg);
console.log(addedArray);

v2.splice(v2.length, 0, ...addedArray);

console.log('Updated scores: ', v2);

