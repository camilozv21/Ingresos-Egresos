const router = require('express').Router();
const controller = require('../controllers/movementControllers');

router.get('/movements', controller.getMovements);
router.post('/add', controller.addMovement);
router.put('/update/:id', controller.updateMovement);
router.delete('/delete/:id', controller.deleteMovement);

module.exports = router;