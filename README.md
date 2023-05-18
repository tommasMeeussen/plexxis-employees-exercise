# PLEXXIS Interview Exercise

This repository contains the code for the PLEXXIS Interview Exercise, which is a CRUD application built with React. The application interacts with a REST API to retrieve employee data and provides a user-friendly interface for managing employees. 

For this exercise, I decided to expand my skills by utilizing PostgreSQL as the database backend. Setting up the database and creating the necessary API endpoints for fetching, creating, and deleting employees took a good amount of my efforts as i've mainly worked with MongoDB, Firebase, and SQLServer in the past. To display the employee data, I employed the React Table component with options to edit and delete specific employees. Managing the application's state was achieved through the use of the React Context API.

## Requirements
- [X] Create a CRUD application that retrieves employees from a REST API.
- [X] Display the employees in a React application.
- [X] Implement UI mechanisms for creating and deleting employees.
- [X] Implement API endpoints for creating and deleting employees.
- [X] Edit the README.md file to provide an explanation of the project, your efforts, and other relevant information.

## Bonus Objectives
- [X] Use a relational database (SQLite, MariaDB, Postgres) to store the employee data.
- [X] Implement UI mechanisms to edit/update employee data.
- [X] Add API endpoint(s) for updating employee data.
- [X] Utilize React Table for displaying the employees in the React application.

## Application Functionality Overview
# Landing page
Data is retrieved from PostgreSql DB and displayed on the landing page using react-table. Update and delete UI mechanisms are available for each employee in the table.
Add employee button under table navigates to AddEmployee page
<img width="1680" alt="image" src="https://github.com/tommasMeeussen/plexxis-employees-exercise/assets/46820380/eeed97e6-d596-4e10-bbfa-fec0516316ae">

# Add Employee Page
Form to input employee details. On Add Employee click a new employee is created and added to the DB  
<img width="1680" alt="image" src="https://github.com/tommasMeeussen/plexxis-employees-exercise/assets/46820380/3a68f7b9-8d87-49e9-8a39-48b54f0f04ef">

#Update Employee
Update employee displays the employee form with selected user data filled out. On update button click the employee's information is updated in the DB 
<img width="1678" alt="image" src="https://github.com/tommasMeeussen/plexxis-employees-exercise/assets/46820380/ded87008-2a6d-481f-8bf3-de4cea09acea">


