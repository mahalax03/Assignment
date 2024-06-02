const express = require("express");
const app = express();
const employeeModel = require("../Models/employeeModel");
const e = require("express");

app.post("/create-employee", async (req, res) => {
  const employee = new employeeModel(req.body);
  try {
    await employee.save();
    res.send(employee);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/get-all", async (req, res) => {
  try {
    const employees = await employeeModel.find();

    res.send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.delete("/delete", async (req, res) => {
  try {
    await employeeModel.deleteMany();
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, role, age, blood, division } = req.body;

  try {
    let employee = await employeeModel.findOne({ id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = name || employee.name;
    employee.role = role || employee.role;
    employee.age = age || employee.age;
    employee.blood = blood || employee.blood;
    employee.division = division || employee.division;

    await employee.save();

    return res
      .status(200)
      .json({ message: "Employee details updated successfully" });
  } catch (error) {
    console.error("Error updating employee details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await employeeModel.deleteOne({ id });

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
