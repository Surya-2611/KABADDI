const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Register Player
router.post('/register', async (req, res) => {
  try {
    const { name, village, team, aadhaarLast4 } = req.body;
    if (!name || !village || !team || !aadhaarLast4) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Prevent duplicate Aadhaar registration
    const exists = await Player.findOne({ aadhaarLast4 });
    if (exists) { 
      return res.status(409).json({ error: 'Aadhaar already registered.' });
    }
    const player = new Player({
      name,
      village,
      team,
      aadhaarLast4,
      verified: true
    });
    await player.save(); 
    res.status(201).json(player);
  } catch (err) {
    next(err);
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
});

// Get player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found.' }); 
    }
    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
});

// Update player status
router.put('/:id/status', async (req, res) => {
  try {
    const { verified } = req.body;
    if (typeof verified !== 'boolean') {
      return res.status(400).json({ error: 'Verified status must be boolean.' });
    }
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { verified },
      { new: true }
    );
    if (!player) {
      return res.status(404).json({ error: 'Player not found.' });
    }
    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
});

// Delete player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found.' });
    }
    res.status(200).json({ message: 'Player deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
