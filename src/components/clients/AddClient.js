import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    const { firestore } = this.props;
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => this.props.history.push("/"));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Return to dashboard
            </Link>

            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName"> First Name</label>
                    <input
                      required
                      minLength="2"
                      name="firstName"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.firstName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName"> Last Name</label>
                    <input
                      required
                      minLength="2"
                      name="lastName"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.lastName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"> E-mail</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone"> phone</label>
                    <input
                      required
                      minLength="10"
                      name="phone"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance"> Balance</label>
                    <input
                      name="balance"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.balance}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.PropTypes = {
  firestore: PropTypes.object.isRequired
};
export default firestoreConnect()(AddClient);
