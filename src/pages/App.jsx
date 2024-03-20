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
import { getId } from "../services/guest-repository.ts";

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

    addGuest = async (guest) => {
        guest.userId = getId(this.state.unfilteredGuests);
        guest.partnerId = null;
        guest.hasEmailSent = false;
        guest.hasConfirmed = false;
        guest.confirmedOn = null;
        guest.isActive = true;
        let unfilteredGuests = [ ...this.state.unfilteredGuests ];
        unfilteredGuests.push(guest);

        this.setState({unfilteredGuests}, this.updateFilteredGuests);
        
        let body = {
            guest
        };
        await postData("/addguest", body);
    }

    changeSelectedGuest = (guest) => {
        this.setState({
            selectedGuest: guest
        });
    }

    deleteFromList = async (guest) => {
        let unfilteredGuests = [ ...this.state.unfilteredGuests ];
        let fg = unfilteredGuests.find(fg => fg.userId === guest.userId);
        let index = unfilteredGuests.indexOf(fg);
        unfilteredGuests.splice(index, 1);

        this.setState({unfilteredGuests}, this.updateFilteredGuests);

        let body = {
            guestId: guest.userId
        }

        await postData("/remove", body);
    }

    fetchGuests = async () => {
        let data = staticData;//staticData; //await fetchData("/guests");

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

    updateFilteredGuests = () => {
        this.setState({
            filteredGuests: orderBy(this.state.unfilteredGuests)
        });
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

                    <Route exact
                            path="/wedding-invite-admin/add"
                            element={<Edit addGuest={this.addGuest} />}></Route>
                </Routes>
            </Router>
        )
    };
}

export default App;