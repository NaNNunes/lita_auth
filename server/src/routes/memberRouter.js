const express = require("express");
const router = express.Router();

const { allMembers, newMember, login} = require("../controllers/MemberController.js");

router.get("/members", allMembers);
router.post("/members/new", newMember);
router.post("/login", login);
router.post("/logout", ()=> {})

module.exports = router;