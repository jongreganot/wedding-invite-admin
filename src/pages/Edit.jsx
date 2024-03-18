import React from "react"
import CustomLink from "../components/CustomLink";

class Edit extends React.Component {
    state = {
        guest: null
    }

    componentDidMount() {
        this.setState({
            guest: this.props.guest
        });
    }

    handleFirstNameChange = (e) => {
        let guest = { ...this.state.guest };
        guest.firstName = e.target.value;
        this.setState({guest});
    }

    handleLastNameChange = (e) => {
        let guest = { ...this.state.guest };
        guest.lastName = e.target.value;
        this.setState({guest});
    }

    render () {
        return (
            <div className="container px-4 my-5 col-12">
                <div className="d-flex flex-column col-6">
                    <input type="text" className="form-control fs-small" id="query" placeholder="First Name" onChange={this.handleFirstNameChange} value={this.state.guest ? this.state.guest.firstName : ""}></input>
                    <input type="text" className="form-control fs-small mt-4" id="query" placeholder="Last Name" onChange={this.handleFirstNameChange} value={this.state.guest ? this.state.guest.lastName : ""}></input>
                    <button className="btn btn-primary mt-4" onClick={() => this.props.updateGuest(this.state.guest)}>
                        <CustomLink linkText="Submit"
                                    linkName="Home" />
                    </button>
                </div>
            </div>
        )
    };
}

export default Edit;