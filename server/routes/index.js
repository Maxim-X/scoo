const Router = require('express');
const router = new Router();
const companyRouter = require('./companyRouter');
const userRouter = require('./userRouter');
const roleAccessRouter = require('./roleAccessRouter');

router.use('/company', companyRouter);
router.use('/user', userRouter);
router.use('/role', roleAccessRouter);

module.exports = router;