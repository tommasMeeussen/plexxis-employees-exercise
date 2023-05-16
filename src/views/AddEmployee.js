import React, { Fragment, useState, useContext } from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AddEmployee()  {
    const [id, setId] = useState(3);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [profession, setProfession] = useState('');
    const [city, setCity] = useState('');
    const [color, setColor] = useState('');
    const [branch, setBranch] = useState('');
    const [assigned, setAssigned] = useState(0);

    //const { addEmployee, employees } = useContext(GlobalContext);
    let navigate = useNavigate();

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

    const onSubmit = e =>{
        console.log(id);
        e.preventDefault();
    fetch('http://localhost:8080/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, code, profession, color, city, branch, assigned: Number(assigned) }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        navigate("/");

      });

  }

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label  htmlFor="name">
                            Name of employee
                        </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
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
                        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Enter Code" />
                    </div>
                    <div>
                        <label htmlFor="profession">
                            Profession
                        </label>
                        <input value={profession} onChange={(e) => setProfession(e.target.value)} type="text" placeholder="Enter profession" />
                    </div>
                    <div>
                        <label htmlFor="color">
                            Color
                        </label>
                        <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="Enter color" />
                    </div>
                    <div>
                        <label htmlFor="branch">
                            Branch
                        </label>
                        <input value={branch} onChange={(e) => setBranch(e.target.value)} type="text" placeholder="Enter branch" />
                    </div>
                    <div >
                        <button >
                            Add Employee
                        </button>
                    </div>
                    <div><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </>
    )
}