
const express = require("express");
const router = express.Router();

const {authenticate} = require('../middlewares/auth')

router.post("/",authenticate);


module.exports= router