import React, { Component } from 'react';
import { fetchData } from '../services/services.ts';
import { filterItems, orderBy } from '../helpers/array-helper.ts';
import { staticData } from '../constants/static-data.ts';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        query: "",
        guests: [],
        filteredGuests: []
    }

    componentDidMount() {
        this.fetchGuests();
    }

    fetchGuests = async () => {
        let data = staticData; //await fetchData("/guests");

        this.setState({
            guests: data.guests,
            filteredGuests: orderBy(data.guests, "")
        });
    }

    searchGuests = (e) => {
        this.setState({
            filteredGuests: filterItems(this.state.guests, e.target.value)
        });
    }
     
    render() { 
        return ( 
            <div className="container px-4 my-4">
                <input type="text" className="form-control" id="query" onChange={(e) => this.searchGuests(e)} placeholder="Search..."></input>

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Confirmed?</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        this.state.filteredGuests.map(guest => {
                            return (
                                <tr key={`row-${guest.userId}`}>
                                    <th scope="row">{guest.userId}</th>
                                    <td>{guest.firstName}</td>
                                    <td>{guest.lastName}</td>
                                    <td>{guest.hasConfirmed ? "Yes" : ""}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
         );
    }
}
 
export default Home;