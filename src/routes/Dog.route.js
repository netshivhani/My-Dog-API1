const express = require('express');
const router = express.Router();

const DogController = require('../controllers/Dog.controller');

// get all Dogs
router.get('/', DogController.getDogList);

// get Dog by ID
router.get('/:id',DogController.getDogByID);

// create new Dog
router.post('/', DogController.createNewDog);

// update Dog
router.put('/:id', DogController.updateDog);

// delete Dog
router.delete('/:id',DogController.deleteDog);

module.exports = router;