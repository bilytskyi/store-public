const Router = require('express');
const router = new Router();
const basketController = require('..//controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, basketController.create); // auth for add device to basket
router.get('/', authMiddleware, basketController.getAll); // auth for get user basket content

module.exports = router;
