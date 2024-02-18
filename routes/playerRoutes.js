const express = require('express')
const router = express.Router()
const playersController = require('../controllers/playersController')

router.route('/stats')
        .get(playersController.getAllPlayers)
   
router.route('/stats/:name')
        .get(playersController.getSpecificPlayer)

router.route('/stats/:position')
        .get(playersController.getPlayerByPosition)


module.exports = router