const express = require("express");
const router = express.Router();

const { 
    allMembers, edit, member, newMember, memberLogin, memberLogout
} = require("../controllers/MemberController.js");

router.get("/members", allMembers);
router.get("/members/:enrollment", member);
router.patch("/members/edit/:enrollment", edit);
router.post("/members/new", newMember);
router.post("/login", memberLogin);
router.patch("/logout", memberLogout);

module.exports = router;