const { Router } = require("express");
const { commonResponse } = require("./users.controller");

const router = Router();

router.all("/", commonResponse);

module.exports = router;