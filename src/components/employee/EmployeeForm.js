import React, { Component } from "react"
import "./Employee.css"

export default class EmployeeForm extends Component {
    // Set initial state
    state = {
        name: "",
        title: "",
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating employee object, and
        invoking the function reference passed from parent component
     */
    constructNewEmployee = evt => {
        evt.preventDefault()
            const employee = {
                name: this.state.name,
                title: this.state.title,
            }

            // Create the employee and redirect user to employee list
            this.props.addEmployee(employee).then(() => this.props.history.push("/employees"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                        <label htmlFor="name">Employee Name</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="name"
                               placeholder="Employee Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">title</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="title" placeholder="title" />
                    </div>
                    <button type="submit" onClick={this.constructNewEmployee} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}