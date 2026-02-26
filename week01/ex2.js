"use strict";

const userNames = `luigi de russis, luca    Mannella, 
    Fulvio Corno, Juan Pablo Saenz Moreno,  
    Enrico Masala, Antonio Servetti `;

const names = userNames.split(",");

console.log(names);

for (let i = 0; i < names.length; i++) {
    names[i] = names[i].trim();
}

console.log(names);

const acronyms = [];
for (const name of names) {
    let str = name[0].toUpperCase();
    for (let i = 1; i < name.length; i++) {
        if (name[i-1] === " " && name[i] !== " ") {
            str += name[i].toUpperCase();
        }
    }
    acronyms.push(str);
}
acronyms.sort();
console.log(acronyms);