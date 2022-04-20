const db = require('../../data/db-config')

const getAll = async() => {
  return await db('cars')
}

const queryOneByValue = async ( obj ) => { 
  return await db('cars').where(obj).first() 
}

const getByVin = async(vin) => {
  return await queryOneByValue({vin})
}

const getById = async(id) => {
  return await queryOneByValue({id})
}

const create = async(car) => {
  return await db('cars').insert(car)
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}