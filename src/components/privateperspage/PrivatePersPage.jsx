import React, { Component } from "react";
import { connect } from "react-redux";
import PaymentWraper from "../pay/PaymentWraper";
import Moment from "react-moment";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";

const initialState = {
  topUp: false,
  success: false,
  amountInEUR: 0,
  error: ""
};
class PrivatePersPage extends Component {
  state = initialState;

  topUp = () => {
    if (this.state.amountInEUR < 1) {
      this.setState({
        error: "Please input value in EUR."
      });
      return;
    }
    this.setState({
      topUp: true,
      success: false,
      error: ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.paidAdvertLimit !== this.props.user.paidAdvertLimit) {
      this.setState({ ...initialState, success: true });
    }
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Welcome: {this.props.user.username}
              </h5>
              <ul className="list-group list-group-flush">
                {+this.props.user.freeAdvertLimit ? (
                  <li className="list-group-item">
                    You can publish {this.props.user.freeAdvertLimit} free
                    advertisements
                  </li>
                ) : (
                  ""
                )}
                <li className="list-group-item"></li>
                <li className="list-group-item">
                  Registered:{" "}
                  <Moment fromNow ago>
                    {this.props.user.createdAt}
                  </Moment>
                </li>
                <li className="list-group-item">
                  Email: {this.props.user.email}
                </li>
                {+this.props.user.phoneNumber ? (
                  <li className="list-group-item">
                    Phone: {this.props.user.phoneNumber}
                  </li>
                ) : (
                  <li className="list-group-item">
                    You have not published your phone number.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="card">
            <div className="card-body">
              {this.state.success ? (
                <div className="alert alert-success mt-3" role="alert">
                  Your account was successfuly charged
                </div>
              ) : this.state.topUp ? (
                <PaymentWraper amountInCents={+this.state.amountInEUR * 100} />
              ) : (
                <div className="row">
                  <div className="input-group mb-3 col-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text">EUR</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      name="amountInEUR"
                      placeholder=""
                      min="1"
                      max="100"
                      step="1"
                      value={this.state.amountInEUR}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                  {this.state.error ? (
                    <div className="input-group mb-3">
                      <small className="text-danger col-12">
                        {this.state.error}
                      </small>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="input-group mb-3">
                    <button
                      onClick={this.topUp}
                      className="btn btn-sm btn-success ml-3"
                    >
                      Top Up Balance
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <AddNewAdvert />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps)(PrivatePersPage);
