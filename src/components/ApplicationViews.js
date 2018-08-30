import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import './applicationView.css'
import AnimalDetail from './animals/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owner/OwnerDetail'
import AnimalManager from '../modules/AnimalManager'
import AnimalForm from './animals/AnimalForm'
import EmployeeManager from '../modules/EmployeeManager'
import EmployeeForm from './employee/EmployeeForm'
import OwnerManager from '../modules/OwnerManager'
import OwnerForm from './owner/OwnerForm'
import AnimalEdit from './animals/AnimalEdit'
import Login from './Login'




export default class ApplicationViews extends Component {
    // Check if credentials are in local storage
    isAuthenticated = () => localStorage.getItem("credentials") !== null
    state = {
        locations: [],
        animals: [],
        employees: [],
        owners: []
    }


    componentDidMount() {
        console.log("test", AnimalManager)
        const newState = {}

        fetch("http://localhost:5002/animals")
            .then(r => r.json())
            .then(animals => newState.animals = animals)
            .then(() => fetch("http://localhost:5002/employees")
                .then(r => r.json()))
            .then(employees => newState.employees = employees)
            .then(() => fetch("http://localhost:5002/locations")
                .then(r => r.json()))
            .then(locations => newState.locations = locations)
            .then(() => fetch("http://localhost:5002/owners")
                .then(r => r.json()))
            .then(owners => newState.owners = owners)
            .then(() => this.setState(newState))
    }

    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/animals`))
            .then(e => e.json())
            .then(animals => this.setState({
                animals: animals
            }))
    }

    addAnimal = animal => AnimalManager.post(animal)
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))

    editAnimal = (id, animal) => AnimalManager.edit(id, animal)
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))


    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employees => this.setState({
                employees: employees
            }))
    }

    addEmployee = employee => EmployeeManager.post(employee)
        .then(() => EmployeeManager.getAll())
        .then(employees => this.setState({
            employees: employees
        }))



    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/owners`))
            .then(e => e.json())
            .then(owners => this.setState({
                owners: owners
            }))
    }

    addOwner = owner => OwnerManager.post(owner)
        .then(() => OwnerManager.getAll())
        .then(owners => this.setState({
            owners: owners
        }))


    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />

                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <LocationList locations={this.state.locations} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />


                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            addAnimal={this.addAnimal}
                            deleteAnimal={this.deleteAnimal}
                            animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/animals/edit/:animalId(\d+)" render={(props) => {
                    return <AnimalEdit {...props}
                        animals={this.state.animals}
                        employees={this.state.employees}
                        editAnimal={this.editAnimal} />
                }} />


                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            addEmployee={this.addEmployee}
                            deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />



                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerList {...props}
                            addOwner={this.addOwner}
                            deleteOwner={this.deleteOwner}
                            owners={this.state.owners} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                        addOwner={this.addOwner}
                        owners={this.state.owners} />
                }} />
                <Route exact path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}
