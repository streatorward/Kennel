import React, { Component } from "react"
import "./Animal.css"



export default class AnimalEdit extends Component {
    componentWillMount() {
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId, 0))
        this.setState(animal);
    }
    componentWillUnmount() {
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId, 0))
        this.setState(animal);
    }

    state = {}

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewAnimal = evt => {
        evt.preventDefault()
        const conditionEmployee = typeof this.state.employeeId === 'number'
        const newAnimal = {
            name: this.state.name,
            breed: this.state.breed,
            employeeId: conditionEmployee ? this.state.employeeId : this.props.employees.find(e => e.name === this.state.employeeId).id,
            id: this.state.id
        }
        // Create the animal and redirect user to animal list
        this.props.editAnimal(this.state.id, newAnimal).then(() => this.props.history.push("/animals"))
    }
    render() {
        const employeeName = this.props.employees.find(e => e.id === this.state.employeeId) || {}
        return (
            <React.Fragment>
                <form className="animalForm">
                    <div className="form-group">
                        <label htmlFor="animalName">Animal name</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange.bind(this)}
                               id="name"
                               placeholder="Animal name"
                               defaultValue={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange.bind(this)}
                               id="breed" placeholder="Breed"
                               defaultValue={this.state.breed}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="employee">Assign to caretaker</label>
                        <select defaultValue={this.state.employeeId} name="employee" id="employeeId"
                                onChange={this.handleFieldChange.bind(this)}>
                                <option defaultValue={this.state.employeeId}>{employeeName.name}</option>
                        {
                            this.props.employees.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                        }
                        </select>
                    </div>
                    <button type="submit" onClick={this.constructNewAnimal} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}