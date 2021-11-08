const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE

router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
        return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {dinoData})
})

// NEW ROUTE 
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

router.put('/:idx', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //re-assign the name and type fileds to be edited 
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    // save the edited params to array
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

// SHOW ROUTE 
router.get('/:idx', (req, res)=>{
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = req.params.idx
    
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST ROUTE // POST A NEW DINO
router.post('/', (req, res)=>{
    // get dino array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    // add a new dino to dinoData
    dinoData.push(req.body)

    // save updated dinoData
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to GET /dinosaurs (index)
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dino array
    dinoData.splice(req.params.idx, 1)
    //save new dino to JSON file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    JSON.stringify(dinoData)

    res.redirect('/dinosaurs')
})



module.exports = router