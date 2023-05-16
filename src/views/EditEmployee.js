import React, { Fragment, useState, useContext, useEffect } from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function EditEmployee()  {
    const location = useLocation();
  const employee = location.state ? location.state.employee : null;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [profession, setProfession] = useState('');
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [branch, setBranch] = useState('');
  const [assigned, setAssigned] = useState(0);


    //const { addEmployee, employees } = useContext(GlobalContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (employee) {
            console.log(employee);
          setId(employee.id);
          setName(employee.name);
          setCode(employee.code);
          setProfession(employee.profession);
          setColor(employee.color);
          setCity(employee.city);
          setBranch(employee.branch);
          setAssigned(employee.assigned);
        }
      }, [employee]);

    // const onSubmit = e => {
    //     e.preventDefault();
    //     const newEmployee = {
    //         id: 1,
    //         name,
    //         location,
    //         designation
    //     }
    //     addEmployee(newEmployee);
    //     navigate("/");
    // }

    const onSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/employee/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: Number(id), name, code, profession, color, city, branch, assigned: Number(assigned) }),
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            alert(data);
            navigate("/");
          })
          .catch(error => {
            console.error('Error updating employee:', error);
            alert('Failed to update employee');
          });
      };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label  htmlFor="name">
                            Name of employee
                        </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label  htmlFor="id">
                            id of employee
                        </label>
                        <input value={id} onChange={(e) => setId(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="code">
                            Code
                        </label>
                        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="profession">
                            Profession
                        </label>
                        <input value={profession} onChange={(e) => setProfession(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <label htmlFor="color">
                            Color
                        </label>
                        <input value={color} onChange={(e) => setColor(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="branch">
                            Branch
                        </label>
                        <input value={branch} onChange={(e) => setBranch(e.target.value)} type="text" />
                    </div>
                    <div >
                        <button >
                            Update Employee
                        </button>
                    </div>
                    <div><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </>
    )
}