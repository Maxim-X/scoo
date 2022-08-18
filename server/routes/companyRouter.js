const Router = require('express');
const router = new Router();

const companyController = require('../controllers/companyController');

router.post('/',companyController.create);
router.get('/:id',companyController.getOne);


module.exports = router