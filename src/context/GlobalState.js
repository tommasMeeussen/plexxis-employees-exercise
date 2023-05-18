import React, { createContext, useState, useEffect } from 'react';
import { CreateEmployee, UpdateEmployee, DeleteEmployee } from '../api/EmployeeApiActions';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from the API and update the state
  useEffect(() => {
    fetch('http://localhost:8080/api/employee')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  // Add a new employee in db and update state
  const addEmployee = (employee) => {
    return CreateEmployee(employee)
      .then((data) => {
        setEmployees([...employees, data]);
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  // Update an employee in db and change state to match
  const updateEmployee = (id, updatedEmployee) => {
    return UpdateEmployee(id, updatedEmployee)
      .then((data) => {
        setEmployees((prevEmployees) => {
          const updatedEmployees = prevEmployees.map((employee) => {
            if (employee.id === id) {
              return updatedEmployee;
            }
            return employee;
          });
          return updatedEmployees;
        });
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  // Delete an employee
  const deleteEmployee = (id) => {
    return DeleteEmployee(id)
      .then(() => {
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== id
        );
        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <GlobalContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
