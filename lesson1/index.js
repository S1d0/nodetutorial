import fs from 'fs'
import http from 'http';
import url from 'url'

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Server
const server = http.createServer((req, res) =>{
    console.log(req.url)
    const pathName = req.url;
    if(pathName == '/overview') {
        res.end("Hello Overview ");
    }
}) 

server.listen(8080,'localhost',() => {
    console.log("Listen here little shit :eyes:")
});
 
