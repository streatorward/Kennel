import React, { Component } from 'react'
import "./Location.css"

export default class LocationList extends Component {
    render () {
        return (
            <section className="locations">
            <h3 className="locationHeader">Our Locations</h3>
            
            {
                this.props.locations.map(location =>
                    <div key={location.id} className="card">
                        <div className="card-body">
                            <h2 className="card-title">
                                {location.name}
                            </h2>
                            <h5>{location.address}
                            </h5>
                            
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}