import React, { Fragment, useState, useContext, useEffect } from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { ChromePicker } from 'react-color';
import { GlobalContext } from '../context/GlobalState';




export default function EditEmployee() {
    const { updateEmployee } = useContext(GlobalContext);
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
    const [formError, setFormError] = useState('');
    let navigate = useNavigate();

    //Get employee data to be displayed in form
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

    //Update employee form submit handler
    const onSubmit = e => {
        e.preventDefault();

        if (!name || !code || !profession || !city || !branch) {
            setFormError('Please fill in all required fields');
            return;
        }
        const updatedEmployee = { id, name, code, profession, color, city, branch, assigned: Number(assigned) }
        updateEmployee(id, updatedEmployee)
            .then(() => {
                alert("Employee Updated successfully");
                navigate('/');
            })
            .catch(error => {
                console.error("Error adding employee:", error);
            });
    };

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
                            <label htmlFor="code">Code</label>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                type="text"
                                placeholder="Enter Code"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profession">Profession</label>
                            <input
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                                type="text"
                                placeholder="Enter profession"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <div className="color-picker-container">
                                <ChromePicker
                                    className="color-picker"
                                    onChange={(color) => {
                                        setColor(color.hex);
                                    }}
                                    color={color}
                                ></ChromePicker>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="Enter city"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="branch">Branch</label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option value="">Select branch</option>
                                <option value="Abacus">Abacus</option>
                                <option value="Chatterton">Chatterton</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="assigned">Assigned</label>
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={assigned}
                                onChange={(e) => setAssigned(e.target.checked ? 1 : 0)}
                            />
                        </div>
                        {formError && <div className="error-message">{formError}</div>}
                        <div className="form-actions">
                            <button type="submit">Update</button>
                            <Link to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}