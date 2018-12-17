import React, { Component } from "react";
import { Link } from "react-router-dom";

class Clients extends Component {
  render() {
    const clients = [
      {
        id: "1",
        firstName: "jevin",
        lastName: "kohnston",
        email: "kevin@gmail.com",
        phone: "555-555-55555",
        balance: "1000000"
      },
      {
        id: "2",
        firstName: "Bo",
        lastName: "JackSOn",
        email: "Bo@gmail.com",
        phone: "555-555-66666",
        balance: "30"
      }
    ];

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
            <div className="col-md-6" />
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
      return <h1>Loading ...</h1>;
    }
  }
}

export default Clients;
