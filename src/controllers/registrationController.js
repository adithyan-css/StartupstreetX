const Participant = require('../models/Participant');
const hostelBlocks = require('../utils/hostelBlocks');

async function registerParticipant(req, res) {
  try {
    const { team_name, leader, members } = req.body;

    // Validate leader (if internal)
    if (leader.hostel_category && !hostelBlocks[leader.hostel_category].includes(leader.hostel_block)) {
      return res.status(400).json({ error: 'Leader has invalid hostel block' });
    }

    // Validate team members
    if (members && members.length > 0) {
      if (members.length !== 4) return res.status(400).json({ error: 'Team must have 5 members including leader' });

      for (const m of members) {
        if (!hostelBlocks[m.hostel_category].includes(m.hostel_block)) {
          return res.status(400).json({ error: `Member ${m.name} has invalid hostel block` });
        }
      }
    }

    const participant = new Participant({
      team_name: team_name || null,
      leader,
      members: members || []
    });

    await participant.save();
    res.status(201).json({ message: 'Registration successful', id: participant._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { registerParticipant };
