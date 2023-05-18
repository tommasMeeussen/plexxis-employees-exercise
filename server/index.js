const express = require('express')
const cors = require('cors')
const app = express()
const employees = require('./data/employees.json');

const employeeModel = require('./employeeModel')


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: 'Content-Type, Access-Control-Allow-Headers'
};

app.use(cors(corsOptions))

app.use(express.json())

app.get('/api/employee', (req, res) => {
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

app.put('/api/employee/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;
    employeeModel.editEmployee(updatedEmployee)
      .then(updatedData => {
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

app.delete('/api/employee/:id', cors(corsOptions), (req, res) => {
  employeeModel.deleteEmployee(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.use(express.json());

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))