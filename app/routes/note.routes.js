const express = require("express");
const router = express.Router();
const noteCtrl = require("../controller/note.controller");

router.get("/notes", noteCtrl.getAllNotes);
router.post("/notes/save", noteCtrl.saveNote);
router.put("/notes/update", noteCtrl.updateNode);
router.delete("/notes/delete/:noteId", noteCtrl.deleteNote);

module.exports = router;
