'use strict';
const express = require('express');
const controller = require('./../controllers/userController');
const router = express.Router();

router.post('/', controller.create);
router.get('/getuser', controller.getUser);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);
module.exports = router;