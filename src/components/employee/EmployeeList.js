import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import "./Employee.css"

export default class EmployeeList extends Component {
    render() {
        return (

            <React.Fragment>
                <div className="employeeButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/employees/new")
                        }
                        }>
                        Add Employee
                    </button>
                </div>

                <section className="employees">
                    {
                        this.props.employees.map(employee =>
                            <div key={employee.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {employee.name}
                                        <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                                        <button><a
                                            onClick={() => this.props.deleteEmployee(employee.id)}
                                            className="card-link">Delete</a></button>
                                    </h5>
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}