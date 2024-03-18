import React, { Component } from 'react';
import { fetchData, postData } from '../services/services.ts';
import { filterItems, orderBy } from '../helpers/array-helper.ts';
import { staticData } from '../constants/static-data.ts';
import $ from "jquery";
import "../styles/home.scss";
import { wait } from '@testing-library/user-event/dist/utils/index';

class Home extends Component {
    state = { 
        query: "",
        guests: [],
        filteredGuests: []
    }

    componentDidMount() {
        this.fetchGuests();
    }

    fetchGuests = async () => {
        let data = await fetchData("/guests");

        this.setState({
            guests: data.guests,
            filteredGuests: orderBy(data.guests, "")
        });
    }

    deleteGuest = async (event, guest) => {
        let currentActiveRow = event.target.closest(".guest-row.active");
        $(currentActiveRow).addClass("deleted");
        await wait(600);

        this.deleteFromList(guest);

        event.stopPropagation();
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

    searchGuests = (e) => {
        let query = e.target.checked || e.target.value;
        this.setState({
            filteredGuests: filterItems([...this.state.guests], query)
        });
    }

    setActive = (e) => {
        let parent = e.target.parentElement.parentElement;
        let currentActiveRow = parent.querySelector(".active");
        let self = e.target.parentElement;

        $(currentActiveRow).removeClass("active");

        if (currentActiveRow) {
            let currentTds = currentActiveRow.querySelectorAll(".guest-td");
            currentTds.forEach(td => {
                $(td).removeClass("active");
                let tdDelete = td.querySelector(".guest-td-delete");
                $(tdDelete).removeClass("active");
            });
        }

        if (currentActiveRow !== self) {
            $(self).addClass("active");
            let tds = self.querySelectorAll(".guest-td");
            tds.forEach(td => {
                $(td).addClass("active");
                let tdDelete = td.querySelector(".guest-td-delete");
                $(tdDelete).addClass("active");
            });
        }
    }
     
    render() { 
        return ( 
            <div className="container px-4 my-4">
                <div className="d-flex flex-md-row flex-column justify-content-center">
                    <div className="col-md-7 col-12 p-md-5 p-1">
                        <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-md-between col-md-12 gap-2">
                            <div className="col-md-8 col-12">
                                <input type="text" className="form-control fs-small" id="query" onChange={(e) => this.searchGuests(e)} placeholder="Search..."></input>
                            </div>
                            <div className="d-flex flex-row align-items-center ps-1 gap-2">
                                <p className="fs-small mb-0">Has Confirmed?</p>
                                <input className="form-check-input mt-0" type="checkbox" value="" id="hasConfirmedCheck" onChange={(e) => this.searchGuests(e)}></input>
                            </div>
                        </div>
                        <div className="overflow-y-auto vh-60 mt-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col"><p className="fs-normal fw-500 mb-0 text-center">ID</p></th>
                                    <th scope="col"><p className="fs-normal fw-500 mb-0">First Name</p></th>
                                    <th scope="col"><p className="fs-normal fw-500 mb-0">Last Name</p></th>
                                    <th scope="col"><p className="fs-normal fw-500 mb-0 text-center">Confirmed?</p></th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        this.state.filteredGuests.map(guest => {
                                            return (
                                                <tr key={`row-${guest.userId}`} className="guest-row" onClick={(e) => this.setActive(e)}>
                                                    <th scope="row"><p className="fs-small mb-0 text-center pe-none">{guest.userId}</p></th>
                                                    <td className="guest-td">
                                                        <p className="fs-small mb-0 pe-none">{guest.firstName}</p>
                                                    </td>
                                                    <td className="guest-td">
                                                        <p className="fs-small mb-0 pe-none">{guest.lastName}</p>
                                                    </td>
                                                    <td className="guest-td">
                                                        <div className="d-flex flex-row align-items-center pe-none">
                                                            <p className="fs-small mb-0 text-center pe-none w-100">{guest.hasConfirmed ? "Yes" : ""}</p>
                                                            <div className="guest-td-delete d-flex flex-row align-items-center justify-content-center cursor-pointer" onClick={(e) => this.deleteGuest(e, guest)} style={{height: "30px", width: "60px", backgroundColor: "red"}}>
                                                                <p className="mb-0 fs-extra-small pe-none text-light">Remove</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-5 col-12 p-md-5 p-2">
                        <div className="mt-5 p-md-5 p-3 shadow">
                            <div className="px-4">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <p className="fs-small fw-500 mb-0">Total Count</p>
                                    <p className="fs-small mb-0">{this.state.filteredGuests.length} guests</p>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                                    <p className="fs-small fw-500 mb-0">Confirmed</p>
                                    <p className="fs-small mb-0">{this.state.filteredGuests.filter(g => g.hasConfirmed).length} guests</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;