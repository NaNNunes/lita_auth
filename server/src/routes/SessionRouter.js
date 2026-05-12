const express = require("express");
const router = express.Router();

const {sessionLogout, memberSession, newSession} = require("../controllers/SessionController.js");

router.get("/sessions/:member_enrolment", memberSession)
router.post("/sessions/new", newSession);
router.patch("/sessions/logout", sessionLogout)


module.exports = router;