const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  purchaseDay: { type: Date, default: Date.now },
  total: Number
},{collection:'History'});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
