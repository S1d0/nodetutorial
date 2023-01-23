const fs = require('fs')

const toursJson = JSON.parse(fs
    .readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,"UTF-8")
)

exports.checkId = (req,res, next, val) => {
    console.log(`Check id: ${val}`)
    if(val * 1 > toursJson.length) {
        return res
        .status(404)
        .json({
            status: "failed", 
            message: "Invalid ID"
        })
    }
    next()
}

exports.getAllTours =  (req,res) => {
    res
    .status(200)
    .json({
        status: "success",
        data: toursJson
    })
}

exports.getTour = (req, res) => {
    res
    .status(200)
    .json({
        status: "success",
        data: toursJson[req.param.id]
    })
}

exports.createTour = (req, res) => {
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

exports.updateTour = (req,res) => {
    res
    .status(200)
    .json({
        status:"success", 
        data: "<Updated tour here>"
    })
}

exports.deleteTour = (req,res) => {
    res
    .status(200)
    .json({
        status:"success"
    })
}

