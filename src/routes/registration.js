const express = require('express');
const router = express.Router();
const { registerParticipant } = require('../controllers/registrationController');
const Participant = require('../models/Participant');

console.log("Registration routes loaded");

router.post('/', registerParticipant);

router.get('/', async (req, res) => {
  console.log("GET /api/registration called");
  try {
    const participants = await Participant.find().sort({ created_at: -1 });
    res.status(200).json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
