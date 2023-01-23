const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const port = 3000;

const toursJson = JSON.parse(fs
    .readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,"UTF-8")
)

app.get('/', (req, res) => {
    res
    .status(200)
    .send("Hello From The Server");
});

const getAllTours =  (req,res) => {
    res
    .status(200)
    .json({
        status: "success",
        data: toursJson
    })
}

const createTour = (req, res) => {
    console.log(req.body);
    const newId = toursJson[toursJson.length -1].id + 1
    const newTour = Object.assign({id: newId}, req.body);
    toursJson.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursJson), err => {
       if(err) console.log(err)
       res
       .status(201)
       .json({
        status: "success",
        data: newTour
       })
    });
}

const updateTour =  (req,res) => {
    console.log(`Received request patch with id: ${req.params.id}`)
    res
    .status(200)
    .json({
        status:"success", 
        data: "<Updated tour here>"
    })
}

const deleteTour =  (req,res) => {
    console.log(`Delete request with id: ${req.params.id}`)
    res
    .status(200)
    .json({
        status:"success"
    })
}

// API mappings
app.route("/api/v1/tours")
.get(getAllTours)
.post(createTour)

app.route("/api/v1/tours/:id")
.patch(updateTour)
.delete(deleteTour)


app.listen(port, () => {
    console.log(`App runninng on Port: ${port}`)
});
