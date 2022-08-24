const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require("../middleware/authMiddleware");
const checkAccessCompanyMiddleware = require("../middleware/checkAccessCompanyMiddleware");

router.post('/add', authMiddleware, clientController.create);
// router.post('/edit', authMiddleware, clientController.edit);
router.get('/all', authMiddleware, checkAccessCompanyMiddleware, clientController.getAll);
router.get('/one', authMiddleware, checkAccessCompanyMiddleware, clientController.getOne);


module.exports = router;