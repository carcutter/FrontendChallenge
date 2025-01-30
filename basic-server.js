// This is a basic server that can be used to test the frontend
// I did not want to use libraries like express or fastify because I wanted to run it standalone (no dependencies required)

const http = require("http");

// Example employee data
let employees = [
  { id: 1, employee_name: "Alice", employee_salary: 50000 },
  { id: 2, employee_name: "Bob", employee_salary: 60000 },
  { id: 3, employee_name: "Charlie", employee_salary: 55000 },
];

// Utility to parse request body
const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Server logic
const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split("/").filter(Boolean);
  const method = req.method;

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // List employees
  if (
    method === "GET" &&
    urlParts[0] === "api" &&
    urlParts[1] === "v1" &&
    urlParts[2] === "employees" &&
    !urlParts[3]
  ) {
    console.log("-- List employees");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: employees }));
  }

  // Read a single employee by ID
  else if (
    method === "GET" &&
    urlParts[0] === "api" &&
    urlParts[1] === "v1" &&
    urlParts[2] === "employees" &&
    urlParts[3]
  ) {
    console.log("-- Read a single employee by ID");
    const id = parseInt(urlParts[3], 10);
    const employee = employees.find((e) => e.id === id);

    if (employee) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: employee }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  }

  // Create a new employee
  else if (
    method === "PUT" &&
    urlParts[0] === "api" &&
    urlParts[1] === "v1" &&
    urlParts[2] === "employees"
  ) {
    try {
      console.log("-- Create a new employee");
      const newEmployee = await parseRequestBody(req);
      newEmployee.id =
        employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
      employees.push(newEmployee);

      await wait(1000);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: newEmployee }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request body" }));
    }
  }

  // Update an existing employee
  else if (
    method === "POST" &&
    urlParts[0] === "api" &&
    urlParts[1] === "v1" &&
    urlParts[2] === "employees" &&
    urlParts[3]
  ) {
    console.log("-- Update an existing employee");
    const id = parseInt(urlParts[3], 10);
    const index = employees.findIndex((e) => e.id === id);

    if (index !== -1) {
      try {
        const updatedEmployee = await parseRequestBody(req);
        employees[index] = { id, ...updatedEmployee };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: employees[index] }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request body" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  }

  // Delete an employee
  else if (
    method === "DELETE" &&
    urlParts[0] === "api" &&
    urlParts[1] === "v1" &&
    urlParts[2] === "employees" &&
    urlParts[3]
  ) {
    console.log("-- Delete an employee");
    const id = parseInt(urlParts[3], 10);
    const index = employees.findIndex((e) => e.id === id);

    if (index !== -1) {
      employees.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: { message: "Employee deleted" } }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  }

  // Handle unknown routes
  else {
    console.log("-- Unknown route");
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
