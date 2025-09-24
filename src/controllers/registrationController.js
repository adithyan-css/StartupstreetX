const Participant = require('../models/Participant');
const hostelBlocks = require('../utils/hostelBlocks');

async function registerParticipant(req, res) {
  console.log("POST body:", req.body); // log incoming request
  try {
    const { team_name, leader, members } = req.body;

    if (!leader || !leader.name || !leader.phone) {
      return res.status(400).json({ error: "Leader must have name and phone" });
    }

    console.log("Leader:", leader, "Members:", members);

    // Validate leader hostel block (if provided)
    if (leader.hostel_category && !hostelBlocks[leader.hostel_category]?.includes(leader.hostel_block)) {
      return res.status(400).json({ error: 'Leader has invalid hostel block' });
    }

    // Validate members array
    const memberList = members || [];
    if (memberList.length > 0 && memberList.length !== 4) {
      return res.status(400).json({ error: 'Team must have 5 members including leader' });
    }

    for (const m of memberList) {
      if (!m.name || !m.phone) {
        return res.status(400).json({ error: `Each member must have name and phone` });
      }
      if (m.hostel_category && !hostelBlocks[m.hostel_category]?.includes(m.hostel_block)) {
        return res.status(400).json({ error: `Member ${m.name} has invalid hostel block` });
      }
    }

    const participant = new Participant({
      team_name: team_name || null,
      leader,
      members: memberList
    });

    await participant.save();
    res.status(201).json({ message: 'Registration successful', id: participant._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { registerParticipant };
