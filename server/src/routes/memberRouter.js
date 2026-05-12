const express = require("express");
const router = express.Router();

const { 
    allMembers, auth, edit, member, newMember
} = require("../controllers/MemberController.js");

router.get("/members/:enrollment", member);
router.get("/members", allMembers);
router.post("/members/auth", auth);
router.patch("/members/edit/:enrollment", edit);
router.post("/members/new", newMember);

module.exports = router;