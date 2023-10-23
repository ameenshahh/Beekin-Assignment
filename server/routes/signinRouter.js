const express = require("express");
const router = express.Router();

const { signin } = require("../controllers/signinController");

router.post("/", signin);

module.exports = router;
        