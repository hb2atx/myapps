const express = require('express')
const router = express.Router()
const avgController = require('../controllers/avgController')

router.route('/stats')
        .get(avgController.getAllAvg)
   
router.route('/stats/:position')
        .get(avgController.getAvgByPosition)

router.route('/pg')
        .get(avgController.getAvgPg)

router.route('/sg')
        .get(avgController.getAvgSg)

router.route('/sf')
        .get(avgController.getAvgSf)

router.route('/pf')
        .get(avgController.getAvgPf)

router.route('/c')
        .get(avgController.getAvgC)

module.exports = router