const mongoose = require("./db");

// Member schema for leader & team members
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reg_number: { type: String },
  phone: { type: String, required: true },
  hostel_category: { type: String },  // MH or LH
  hostel_block: { type: String },
});

// Participant schema (team)
const participantSchema = new mongoose.Schema({
  team_name: { type: String },
  leader: { type: memberSchema, required: true },
  members: { type: [memberSchema], default: [] }, // up to 4 members
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", participantSchema);
