const express = require("express")
const carsRouter = require('./cars/cars-router')
const server = express()
server.use(express.json())
server.use('/api/cars',carsRouter)
server.use((err,req,res,next)=>{
    if(!err.message || !err.status) res.status(500).json({message:'internal server error'})
    res.status(err.status).json({message:err.message})
})

module.exports = server
