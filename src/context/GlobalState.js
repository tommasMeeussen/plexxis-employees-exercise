import React, { createContext, useState, useEffect } from 'react';

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
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      })
        .then(response => response.json())
        .then(data => {
          setEmployees([...employees, data]);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // Update an employee in db and change state to match
  const updateEmployee = (id, updatedEmployee) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees((prevEmployees) => {
            const updatedEmployees = prevEmployees.map((employee) => {
              if (employee.id === id) {
                return updatedEmployee; // Use the updatedEmployee directly
              }
              return employee;
            });
            return updatedEmployees;
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Delete an employee
  const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/api/employee/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          const updatedEmployees = employees.filter(
            (employee) => employee.id !== id
          );
          setEmployees(updatedEmployees);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
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
