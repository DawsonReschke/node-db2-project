const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')

const db = require('./cars-model')

const express = require('express')
const server = express(); 

server.get('/',async (req,res)=>{
    res.json(await db.getAll())
})


server.get('/:id',checkCarId, async (req,res)=>{
    res.json((await db.getById(req.params.id)))
})


server.post('/',checkCarPayload,checkVinNumberValid,checkVinNumberUnique,async (req,res)=>{
    const id = (await db.create(req.body))[0]
    res.json({...req.body,id})
})


module.exports = server