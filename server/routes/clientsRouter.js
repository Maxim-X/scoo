const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');

router.post('/add', clientController.create);
router.get('/all', clientController.getAll);
router.get('/one', clientController.getOne);


module.exports = router;