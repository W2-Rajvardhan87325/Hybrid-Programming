import { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        const helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.status == 200 && helper.readyState == 4) {
                let result = JSON.parse(helper.responseText);
                setEmployees(result);
            }
        }
        helper.open("GET", "http://localhost:5000/employee");
        helper.send();
    }

    const addEmployee = () => {
        const helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                let result = JSON.parse(helper.responseText);
                if (result.affectedRows > 0) {
                    clearTextBoxes();
                }
            }
        }
        helper.open("POST", "http://localhost:5000/employee");
        helper.setRequestHeader("content-type", "application/json");
        helper.send(JSON.stringify(employee));
    }

    const editEmployee = (emp) => {
        setEmployee(emp);
    }

    const updateEmployee = () => {
        console.log(employee);
        const helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                let result = JSON.parse(helper.responseText);
                if (result.affectedRows > 0) {
                    clearTextBoxes();
                }
            }
        }
        helper.open("PUT", "http://localhost:5000/employee/" + employee.id);
        helper.setRequestHeader("content-type", "application/json");
        helper.send(JSON.stringify(employee));
    }

    const deleteEmployee = (empId) => {
        debugger;
        const helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
        }
        helper.open("DELETE", "http://localhost:5000/employee/" + empId);
        helper.send();
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