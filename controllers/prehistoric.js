const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE

router.get('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)
    let typeFilter = req.query.typeFilter
    if(typeFilter) {
        creaturesData = creaturesData.filter((creature)=>{
        return creature.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }

    res.render('prehistoric/index.ejs', {creaturesData})
})



// NEW ROUTE 
router.get('/new', (req, res)=>{
    res.render('prehistoric/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)

    res.render('prehistoric/edit.ejs', {creatureId: req.params.idx, creature: creaturesData[req.params.idx]})
})

router.put('/:idx', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)

    //re-assign the name and type fileds to be edited 
    creaturesData[req.params.idx].name = req.body.name
    creaturesData[req.params.idx].type = req.body.type

    // save the edited params to array
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData))
    res.redirect('/prehistoric_creatures')
})

// SHOW ROUTE 
router.get('/:idx', (req, res)=>{
    // get creature
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)

    //get array index from url parameter
    let creaturesIndex = req.params.idx
    
    res.render('prehistoric/show.ejs', {myCreature: creaturesData[creaturesIndex]})
})

// POST ROUTE // POST A NEW DINO
router.post('/', (req, res)=>{
    // get creature array
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)
    
    creaturesData.push(req.body)
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric.json')
    let creaturesData = JSON.parse(creatures)

    creaturesData.splice(req.params.idx, 1)
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData))
    JSON.stringify(creaturesData)

    res.redirect('/prehistoric_creatures')
})



module.exports = router