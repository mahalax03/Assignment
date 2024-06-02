const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  age: {
    type: Number,
  },
  blood: {
    type: String,
  },
  division: {
    type: String,
  },
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
