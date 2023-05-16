import React, { Fragment, useState, useContext } from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function AddEmployee() {
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

    const onSubmit = e => {
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
            <Header />
            <div className="add-employee">
                <div className="employee-form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name of employee</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="code">
                                Code
                            </label>
                            <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Enter Code" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profession">
                                Profession
                            </label>
                            <input value={profession} onChange={(e) => setProfession(e.target.value)} type="text" placeholder="Enter profession" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">
                                Color
                            </label>
                            <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="Enter color" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">
                                City
                            </label>
                            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter city" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="branch">
                                Branch
                            </label>
                            <input value={branch} onChange={(e) => setBranch(e.target.value)} type="text" placeholder="Enter branch" />
                        </div>
                        <div className="form-actions">
                            <button>Add Employee</button>

                            <Link to="/">Cancel</Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );


}