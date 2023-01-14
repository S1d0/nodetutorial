const fs = require('fs');

// Blocking 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(`File input.txt content:${textIn}`);
// 
// const textOut = `This is news: ${textIn}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// 
// Non blocking
fs.readFile('./txt/input.txt', {encoding: 'utf-8'}, (_,text1)=>{
    console.log(`File input.txt content:${text1}`);
});