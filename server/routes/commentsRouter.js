const Router = require('express');
const router = new Router();
const commentsController = require('../controllers/commentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, commentsController.create); // auth for rate something
router.get('/:id', commentsController.getCommentsByDeviceId); // auth don't need

module.exports = router;
