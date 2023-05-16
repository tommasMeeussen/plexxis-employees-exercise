import React, { Fragment, useState, useContext, useEffect } from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';


export default function EditEmployee() {
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
            <Header />
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
                        <button>Edit Employee</button>
                        <Link to="/">Cancel</Link>

                    </div>
                </form>
            </div>
        </>
    );
}