const express = require('express')
const cors = require('cors')
const app = express()
const employees = require('./data/employees.json');

const employeeModel = require('./employeeModel')

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

app.get('/api/employee', cors(corsOptions), (req, res) => {
    employeeModel.getEmployees()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.post('/api/employee', (req, res) => {
    employeeModel.addEmployee(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
        console.error('Error occurred:', error);
        res.status(500).send(error);
    })
  })

  app.put('/api/employee/:id', cors(corsOptions), (req, res) => {
    try {
      const { id } = req.params;
      const updatedEmployee = req.body;
  
      // Call the updateEmployee function to update the employee
      employeeModel.editEmployee(updatedEmployee)
        .then(updatedData => {
          // Return the updated employee data as the response
          res.json(updatedData);
        })
        .catch(error => {
          console.error('Error updating employee:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/employee/:id',cors(corsOptions), (req, res) => {
        employeeModel.deleteEmployee(req.params.id)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })
// app.get('/api/employees', cors(corsOptions), (req, res, next) => {
//   console.log('/api/employees');
//   res.setHeader('Content-Type', 'application/json');
//   res.status(200);
//   res.send(JSON.stringify(employees, null, 2));
// })

app.use(express.json());

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))