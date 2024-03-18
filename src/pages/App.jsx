import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Link,
    Route,
    Navigate
  } from "react-router-dom";
  import Home from './Home';
  import Edit from './Edit';
import { staticData } from "../constants/static-data.ts";
import { fetchData, postData } from '../services/services.ts';
import { filterItems, orderBy } from '../helpers/array-helper.ts';

class App extends React.Component {
    state = {
        selectedGuest: null,
        unfilteredGuests: [],
        filteredGuests: [],
        query: ""
    }

    componentDidMount() {
        this.fetchGuests();
    }

    changeSelectedGuest = (guest) => {
        this.setState({
            selectedGuest: guest
        });
    }

    deleteFromList = async (guest) => {
        let filteredGuests = [ ...this.state.filteredGuests ];
        let fg = filteredGuests.find(fg => fg.userId === guest.userId);
        let index = filteredGuests.indexOf(fg);
        filteredGuests.splice(index, 1);

        this.setState({filteredGuests});

        let body = {
            guestId: guest.userId
        }

        await postData("/remove", body);
    }

    fetchGuests = async () => {
        let data = await fetchData("/guests");

        this.setState({
            unfilteredGuests: data.guests,
            filteredGuests: orderBy(data.guests)
        });
    }

    searchGuests = (e) => {
        let query = e.target.checked || e.target.value;
        this.setState({
            filteredGuests: orderBy(filterItems([...this.state.unfilteredGuests], query))
        });
    }

    updateGuest = async (guest) => {
        let filteredGuests = [ ...this.state.filteredGuests ];
        let fg = filteredGuests.find(fg => fg.userId === guest.userId);
        fg.firstName = guest.firstName;
        fg.lastName = guest.lastName;

        this.setState({filteredGuests});

        let body = {
            guest
        };
        await postData("/update", body);
    }

    render () {
        return (
            <Router>
                <Routes>
                    <Route path="/wedding-invite-admin" element={<Navigate replace to="/wedding-invite-admin/home" />} />
                    <Route exact
                            path="/wedding-invite-admin/home"
                            element={<Home changeSelectedGuest={this.changeSelectedGuest}
                                            deleteFromList={this.deleteFromList}
                                            filteredGuests={this.state.filteredGuests}
                                            unfilteredGuests={this.state.unfilteredGuests}
                                            searchGuests={this.searchGuests} />}></Route>
                    <Route exact
                            path="/wedding-invite-admin/edit"
                            element={<Edit guest={this.state.selectedGuest}
                                            updateGuest={this.updateGuest} />}></Route>
                </Routes>
            </Router>
        )
    };
}

export default App;