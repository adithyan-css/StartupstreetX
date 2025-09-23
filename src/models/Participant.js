const mongoose = require('./db');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reg_number: { type: String },          // only for internal participants
  phone: { type: String, required: true },
  hostel_category: { type: String },     // MH or LH, internal only
  hostel_block: { type: String }
});

const participantSchema = new mongoose.Schema({
  team_name: { type: String },           // only for teams
  leader: { type: memberSchema, required: true },
  members: { type: [memberSchema], default: [] },  // 4 additional members
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', participantSchema);
