import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ChromePicker } from 'react-color';
import { GlobalContext } from '../context/GlobalState';


export default function AddEmployee() {
    const { addEmployee } = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [profession, setProfession] = useState('');
    const [city, setCity] = useState('');
    const [sketchPickerColor, setSketchPickerColor] = useState('#ffffff');
    const [branch, setBranch] = useState('');
    const [assigned, setAssigned] = useState(0);
    const [formError, setFormError] = useState('');

    let navigate = useNavigate();

    //Add employee form submit handler
    const onSubmit = e => {
        e.preventDefault();

        if (!name || !code || !profession || !city || !branch) {
            setFormError('Please fill in all required fields');
            return;
        }

        addEmployee({ name, code, profession, sketchPickerColor, city, branch, assigned: Number(assigned) })
            .then(() => {
                alert("Employee added successfully");
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
                                        setSketchPickerColor(color.hex);
                                    }}
                                    color={sketchPickerColor}
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
                            <button type="submit">Add Employee</button>
                            <Link to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
