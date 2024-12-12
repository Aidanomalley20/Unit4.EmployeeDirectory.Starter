const express = require("express");
const app = express();
const employees = require("./employees");

const init = async () => {
  app.listen(3000, () => console.log("I am listening on port 3000"));
};

app.get("/", async (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees", async (req, res) => {
  res.status(200).json(employees);
});

app.get("/employees/:id", async (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: "Employee not found." });
  }
});

app.get("/employees/random", async (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json({ message: "No employees available." });
  }

  const randomIndex = Math.floor(Math.random() * employees.length);
  res.status(200).json(employees[randomIndex]);
});

init();
