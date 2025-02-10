const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let employees = [
  { id: 1, employee_name: 'John Doe', employee_salary: 50000 },
  { id: 2, employee_name: 'Jane Smith', employee_salary: 60000 },
  { id: 3, employee_name: 'Tom White', employee_salary: 70000 },
  { id: 4, employee_name: 'Alice Brown', employee_salary: 80000 },
  { id: 5, employee_name: 'Bob Green', employee_salary: 90000 },
  { id: 6, employee_name: 'Charlie Black', employee_salary: 100000 },
  { id: 7, employee_name: 'David Lee', employee_salary: 110000 },
  { id: 8, employee_name: 'Eve King', employee_salary: 120000 },
  { id: 9, employee_name: 'Frank Knight', employee_salary: 130000 },
  { id: 10, employee_name: 'Grace Hill', employee_salary: 140000 },
  { id: 11, employee_name: 'Henry Ford', employee_salary: 150000 },
  { id: 12, employee_name: 'Ivy Hall', employee_salary: 160000 },
  { id: 13, employee_name: 'Jack Cook', employee_salary: 170000 },
  { id: 14, employee_name: 'Kelly Bell', employee_salary: 180000 },
  { id: 15, employee_name: 'Larry Cox', employee_salary: 190000 },
];

// Get all employees with pagination
app.get('/api/v1/employees', (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedEmployees = employees.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: employees.length,
    totalPages: Math.ceil(employees.length / limit),
    data: paginatedEmployees,
  });
});

// Get employee by ID
app.get('/api/v1/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.json(employee);
});

// Create a new employee
app.post('/api/v1/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    employee_name: req.body.employee_name,
    employee_salary: req.body.employee_salary,
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update an employee by ID
app.put('/api/v1/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');

  if (req.body.employee_name) {
    employee.employee_name = req.body.employee_name;
  }
  if (req.body.employee_salary) {
    employee.employee_salary = req.body.employee_salary;
  }

  res.json(employee);
});

// Delete an employee by ID
app.delete('/api/v1/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id === parseInt(req.params.id));
  if (employeeIndex === -1) return res.status(404).send('Employee not found');

  const deletedEmployee = employees.splice(employeeIndex, 1);
  res.json(deletedEmployee);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
