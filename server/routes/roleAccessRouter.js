const Router = require('express');
const router = new Router();
const roleAccessController = require('../controllers/roleAccessController');

router.post('/', roleAccessController.create);
router.get('/', roleAccessController.get);
router.get('/:id', roleAccessController.getOne);


module.exports = router;