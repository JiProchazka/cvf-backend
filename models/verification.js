const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });
// Create a model
const Verification = mongoose.model("verification", schema);

// Export the model
module.exports = Verification;
