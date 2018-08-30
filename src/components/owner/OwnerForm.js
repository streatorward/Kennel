import React, { Component } from "react"
import "./Owner.css"

export default class OwnerForm extends Component {
    // Set initial state
    state = {
        name: "",
        info: "",
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating owner object, and
        invoking the function reference passed from parent component
     */
    constructNewOwner = evt => {
        evt.preventDefault()
            const owner = {
                name: this.state.name,
                info: this.state.info,
            }

            // Create the owner and redirect user to owner list
            this.props.addOwner(owner).then(() => this.props.history.push("/owners"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="ownerForm">
                    <div className="form-group">
                        <label htmlFor="name">Owner Name</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="name"
                               placeholder="Owner Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="info">Info</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="info" placeholder="info" />
                    </div>
                    <button type="submit" onClick={this.constructNewOwner} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}