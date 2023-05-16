import './App.css';
import EmployeeList from './views/EmployeeList';
import AddEmployee from './views/AddEmployee';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import EditEmployee from './views/EditEmployee';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList/>} exact />
        <Route path="/add" element={<AddEmployee/>} exact />
        <Route path="/editemployee" element={<EditEmployee/>} exact />

      </Routes>
    </Router>
  );
}

export default App;
