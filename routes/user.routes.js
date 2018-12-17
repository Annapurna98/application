const express = require('express');
const router = express.Router();
var logger = require('../util/logger');
const joi=require('express-joi-validator');
const schema = require('../schemas/user.schema');
const service = require('../services/user.service');

router.post('/register',joi(schema.userSchema),service.addUser);
router.post('/login',service.loginUser);



module.exports = router;
