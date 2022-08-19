const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');

router.post('/create',companyController.create);
router.get('/getall',companyController.getAll);
router.get('/getone/:id',companyController.getOne);


module.exports = router