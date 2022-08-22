const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require("../middleware/authMiddleware");
const checkAccessCompanyMiddleware = require("../middleware/checkAccessCompanyMiddleware");

router.post('/add', authMiddleware, clientController.create);
router.get('/all', authMiddleware, checkAccessCompanyMiddleware, clientController.getAll);
router.get('/one', authMiddleware, clientController.getOne);


module.exports = router;