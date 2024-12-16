import { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Dashboard() {
    const [employees, setEmployees] = useState([]);

    const [employee, setEmployee] = useState({
        id: 0,
        name: "",
        email: "",
        password: "",
        address: ""
    })

    const [searchName, setSearchName] = useState("");

    const getAllEmployees = () => {
        axios.get("http://localhost:5000/employee").then((result) => {
            setEmployees(result.data);
        });
    }

    const addEmployee = () => {
        axios.post("http://localhost:5000/employee", employee).then((result => {
            if (result.data.affectedRows > 0) {
                clearTextBoxes();
            }
        }))
    }

    const editEmployee = (emp) => {
        setEmployee(emp);
    }

    const updateEmployee = () => {
        axios.put("http://localhost:5000/employee/" + employee.id, employee).then((result => {
            if (result.data.changedRows > 0) {
                clearTextBoxes();
            }
        }))
    }

    const deleteEmployee = (empId) => {
        axios.delete("http://localhost:5000/employee/" + empId).then((result) => {
            debugger;
            if (result.data.affectedRows > 0) {
            }
        })

    }

    const onSearchBoxChanged = (name) => {
        setSearchName(name.target.value);
    }

    const onTextChanged = (args) => {
        let copy = { ...employee };
        copy[args.target.name] = args.target.value;
        setEmployee(copy);
    }

    const clearTextBoxes = () => {
        setEmployee({
            id: 0,
            name: "",
            email: "",
            password: "",
            address: ""
        })
    }

    useEffect(() => {
        getAllEmployees();
    })

    return (
        <div className="container">
            <div>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add Employee</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "5px",
                        justifyItems: "center",
                        marginBottom: "6px",
                    }}
                >
                    <div className="mb-3">
                        Name
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={employee.name}
                            onChange={onTextChanged}
                            style={{ width: "100%", margin: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        Email
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={employee.email}
                            onChange={onTextChanged}
                            style={{ width: "100%", margin: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        Password
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={employee.password}
                            onChange={onTextChanged}
                            style={{ width: "100%", margin: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        Address
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={employee.address}
                            onChange={onTextChanged}
                            style={{ width: "100%", margin: "5px" }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "10px", // Add spacing between buttons
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={addEmployee}
                        style={{
                            padding: "10px 20px",
                            width: "150px",
                        }}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={updateEmployee}
                        style={{
                            padding: "10px 20px",
                            width: "150px",
                        }}
                    >
                        Update
                    </button>
                </div>
            </div>

            <br />
            <hr />

            <div className="row g-3 d-flex justify-content-center">
                <div className="col-auto">
                    Search Name : :
                    <input type="text" className="form-control" value={searchName} onChange={onSearchBoxChanged} />
                </div>
            </div>
            <hr />
            <br />
            <div className="table-responsive">
                <table className='table table-bordered table-hover' style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>NAME</b></th>
                            <th><b>EMAIL</b></th>
                            <th><b>ADDRESS</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((emp) => {
                                if (emp.name.toLowerCase().includes(searchName.toLowerCase())) {
                                    return (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.address}</td>
                                            <td>
                                                <button type='button' className='btn btn-warning' onClick={() => {
                                                    editEmployee(emp)
                                                }}>Edit</button>
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-danger' onClick={() => {
                                                    deleteEmployee(emp.id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Dashboard;