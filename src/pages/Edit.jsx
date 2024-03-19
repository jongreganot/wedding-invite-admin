import React from "react"
import CustomLink from "../components/CustomLink";

class Edit extends React.Component {
    state = {
        guest: {
            firstName: "",
            lastName: "",
            suffix: ""
        }
    }

    componentDidMount() {
        this.setState({
            guest: this.props.guest ? this.props.guest : this.state.guest
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

    handleSuffixChange = (e) => {
        let guest = { ...this.state.guest };
        guest.suffix = e.target.value;
        this.setState({guest});
    }

    submit = () => {
        if (this.props.guest) {
            this.props.updateGuest(this.state.guest)
        }
        else {
            this.props.addGuest(this.state.guest);
        }
    }

    render () {
        return (
            <div className="container px-md-4 px-1 my-md-5 my-1 col-12">
                <div className="d-flex flex-column col-md-6 col-12">
                    <input type="text" className="form-control fs-small" id="query" placeholder="First Name" onChange={this.handleFirstNameChange} value={this.state.guest.firstName}></input>
                    <input type="text" className="form-control fs-small mt-4" id="query" placeholder="Last Name" onChange={this.handleLastNameChange} value={this.state.guest.lastName}></input>
                    <input type="text" className="form-control fs-small mt-4" id="query" placeholder="Suffix" onChange={this.handleSuffixChange} value={this.state.guest.suffix}></input>
                    <button className="btn btn-primary mt-4" onClick={this.submit}>
                        <CustomLink linkText="Submit"
                                    linkName="Home" />
                    </button>
                </div>
            </div>
        )
    };
}

export default Edit;