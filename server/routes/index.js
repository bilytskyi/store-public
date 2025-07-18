const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const ratingRouter = require('./ratingRouter');
const basketRouter = require('./basketRouter');
const commentsRouter = require('./commentsRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/rating', ratingRouter);
router.use('/basket', basketRouter);
router.use('/comments', commentsRouter);

module.exports = router;
