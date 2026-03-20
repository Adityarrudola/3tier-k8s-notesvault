const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  console.log("API HIT");

  try {
    const notes = await Note.find();
    console.log("DATA:", notes);

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ADD note
router.post('/', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;