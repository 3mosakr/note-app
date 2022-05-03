const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");
const model = require("../models/note.model");

exports.getAllNotes = (req, res) => {
  // var seqId = generator.generate();
  // memStorage.store.setItem(seqId, "First_key");
  // var seqId_2 = generator.generate();
  // memStorage.store.setItem(seqId_2, "second_key");

  // let keys = memStorage.getKeys(memStorage.store);
  let values = memStorage.getValues(memStorage.store);
  console.log("values..... " + JSON.stringify(values));
  // let Note = model.Note;
  // let noteObj = new Note(seqId, "sss", "ssff", "bbb", new Date());
  // res.send("get all notes.... Keys ...." + JSON.stringify(noteObj));
  return res.status(200).send(JSON.stringify(values));
};

exports.saveNote = (req, res) => {
  let seqId = generator.generate();
  let createdBy = "admin";
  let createdOn = new Date();
  // req.body
  let title = req.body.title;
  let content = req.body.content;
  if (!title || !content) {
    return res
      .status(500)
      .send({ error: "title and content should not be empty" });
  }

  let Note = model.Note;
  let noteObj = new Note(seqId, title, content, createdBy, createdOn);
  memStorage.store.setItem(seqId, noteObj);
  return res.status(201).send("successfully note save");
};

exports.updateNode = (req, res) => {
  let createdBy = "admin";
  let createdOn = new Date();
  // req.body
  let noteId = req.body.noteId;
  let title = req.body.title;
  let content = req.body.content;
  if (!noteId) {
    return res.status(500).send({ error: "noteId should not be empty" });
  }
  let noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({ error: "noteId is not exist." });
  }
  if (!title || !content) {
    return res
      .status(500)
      .send({ error: "title and content should not be empty" });
  }

  let Note = model.Note;
  let noteObj = new Note(noteId, title, content, createdBy, createdOn);
  memStorage.store.setItem(noteId, noteObj);
  return res.status(200).send("successfully note updated");
  // res.send("update note....");
};

exports.deleteNote = (req, res) => {
  let noteId = req.params.noteId;
  // validate not empty
  if (!noteId) {
    return res.status(500).send({ error: "noteId should not be empty" });
  }
  // validate is already exists
  let noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({ error: "noteId is not exist." });
  }
  memStorage.store.removeItem(noteId);
  return res.status(200).send("successfully note deleted.");
};
