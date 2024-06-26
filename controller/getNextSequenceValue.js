const Sequence = require('../models/Sequence');


const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Sequence.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return sequenceDocument.value;
};

module.exports = getNextSequenceValue;