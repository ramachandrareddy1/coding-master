const router = require('express').Router();
const petCtrl = require('../controller/pets.ctrl');

router.get('/', petCtrl.petGetCtrl);
router.post('/', petCtrl.petsValidationMiddleware, petCtrl.petPostCtrl);
router.put('/:petId', petCtrl.petsValidationMiddleware, petCtrl.petPutCtrl);
router.delete('/:petId', petCtrl.petDeleteCtrl);

module.exports = router;