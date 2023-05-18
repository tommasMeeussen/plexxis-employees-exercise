import './App.css';
import EmployeeList from './views/EmployeeList';
import AddEmployee from './views/AddEmployee';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditEmployee from './views/EditEmployee';
import { GlobalProvider } from './context/GlobalState';




function App() {
  return (
    <div className="app-container">
      <Router>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<EmployeeList />} exact />
            <Route path="/add" element={<AddEmployee />} exact />
            <Route path="/editemployee" element={<EditEmployee />} exact />
          </Routes>
        </GlobalProvider>
      </Router>
    </div>
  );
}

export default App;
