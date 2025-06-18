const express = require("express");
const router = express.Router();
const { getBattleResult } = require("../controllers/platoonController");

router.post("/battle", getBattleResult);

module.exports = router;
