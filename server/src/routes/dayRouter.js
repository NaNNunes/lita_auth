const express = require("express");
const router = express.Router();
const { allDays, newDay, lastDay } = require("../controllers/DayController.js");

router.get("/days", allDays);
router.post('/days/new', newDay);
router.get('/days/last', lastDay)

module.exports = router;