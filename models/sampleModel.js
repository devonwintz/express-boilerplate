const mongoose = require("mongoose");

const SampleModelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SampleModel", SampleModelSchema);

/*
    This creates a collection in your monogodb with the name 'SampleModel'
*/
