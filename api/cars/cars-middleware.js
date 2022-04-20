const Joi = require('joi')
const vinValidator = require('vin-validator')
const db = require('./cars-model')

const carSchema = Joi.object({
  vin: Joi.string()
  .required()
  .messages({
    'string.base':'vin should be a string',
    'any.required':'vin is missing'
  }),
  make: Joi.string()
  .required()
  .messages({
    'string.base':'vin should be a string',
    'any.required':'make is missing'
  }),
  model: Joi.string()
  .required()
  .messages({
    'string.base':'vin should be a string',
    'any.required':'model is missing'
  }),
  mileage: Joi.number()
  .required()
  .messages({
    'string.base':'vin should be a string',
    'any.required':'mileage is missing'
  }),
  title: Joi.string()
  .messages({
    'string.base':'vin should be a string',
  }),
  transmission: Joi.string()
  .messages({
    'string.base':'vin should be a string',
  }),
})


const checkCarId = (req, res, next) => {
  const {id} = req.params 
  db.getById(id)
    .then(car=>{
      if(!car) return next({status:404,message:`car with id ${id} is not found`})
      req.car = car; 
      next()
    })
}

const checkCarPayload = (req, res, next) => {
  const validated = carSchema.validate(req.body) 
  if(validated.error) console.log(validated.error.details)
  if(validated?.error) return next({status:400,message:validated.error.details[0].message})
  next()
}

const checkVinNumberValid = (req, res, next) => {
    if(!vinValidator.validate(req.body.vin)) return next({status : 400, message:`vin ${req.body.vin} is invalid`})
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  if(await db.getByVin(req.body.vin)) next({message:`vin ${req.body.vin} already exists`,status:400})
  next()
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}