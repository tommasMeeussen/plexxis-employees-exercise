import { useEffect, useState, useMemo } from "react";
import React from 'react';
import Table from "../components/Table";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeeList() {
  let navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/employee/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        fetchData();
      });
  }

  const editEmployee = (employeeData) => {
    navigate('editemployee', {
      state: { employee: employeeData },
    });
  }

  const columns = useMemo(
    () => [
      {
        // first group
        Header: "Employees",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Code",
            accessor: "code",
          },
          {
            Header: "Profession",
            accessor: "profession",
          },
          {
            Header: "Color",
            accessor: "color",
          },
          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Branch",
            accessor: "branch",
          },
          {
            Header: "Assigned",
            accessor: "assigned",
            Cell: ({ value }) => (value ? 'Yes' : 'No'),
          },
          {
            Header: 'Update',
            Cell: ({ row }) => (

              <button onClick={() => editEmployee(row.original)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            ),
          },
          {
            Header: 'Delete',
            Cell: ({ row }) => (
              <button onClick={() => handleDelete(row.original.id)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
            ),

          },

        ],
      }
    ],
    [editEmployee, handleDelete]
  );

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employee');
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <>

      <div className="home">
        <Header />
        <div className="employee-list">
          <div className="employee-table">
            <Table columns={columns} data={employeeData} />
          </div>
          <Link to="/add" style={{ textDecoration: 'none' }}>
            <button className="add-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>Add Employee</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );

}