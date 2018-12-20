import React, { Component } from "react";
import { Link } from "react-router-dom";

//Componentes needed to connect react redux firestore
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import { reactReduxFirebase } from "react-redux-firebase";
//***** */

import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = { totalOwed: null };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance);
      }, 0);
      return { totalOwed: total };
    }
  }

  render() {
    // const clients = [
    //   {
    //     id: "1",
    //     firstName: "jevin",
    //     lastName: "kohnston",
    //     email: "kevin@gmail.com",
    //     phone: "555-555-55555",
    //     balance: "1000000"
    //   },
    //   {
    //     id: "2",
    //     firstName: "Bo",
    //     lastName: "JackSOn",
    //     email: "Bo@gmail.com",
    //     phone: "555-555-66666",
    //     balance: "30"
    //   }
    // ];
    const { clients } = this.props;
    const { totalOwed } = this.state;

    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5>Total Owed </h5>
              <span className="text-primary">
                {formatter.format(totalOwed)}
              </span>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{formatter.format(client.balance)}</td>
                  <td>
                    {" "}
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.PropTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({ clients: state.firestore.ordered.clients }))
)(Clients);
