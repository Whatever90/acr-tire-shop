import React, { Component } from "react";
import axios from "axios";
import "./Contact.css";
import Popup from "./Popup/Popup";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      message: "",
      category: "Contact me",
      showPopup: false
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    let { name, phone, message } = this.state;
    axios
      .post("/requests/new", { name, phone, message })
      .then(response => {
        console.log(response);
        this.togglePopup();
      })
      .catch(error => console.log(error));
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div id="_contact">
        <div className="section-content">
          <h1 className="section-header">
            Get in{" "}
            <span
              className="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              Touch with us
            </span>
          </h1>
          <h3>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </h3>
        </div>
        <div className="contact-section">
          {!this.state.showPopup ? (
            <div className="container">
              <form
                className="contact-form"
                onSubmit={(event) => this.handleSubmit(event)}
              >
                <div className="col-md-6 form-line">
                  <div className="form-group">
                    <label htmlFor="exampleInputUsername">Your name</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      placeholder=" Enter Name"
                      onChange={event => this.handleChange("name", event)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Mobile No.</label>
                    <input
                      type="tel"
                      type="number"
                      className="form-control"
                      id="telephone"
                      placeholder=" Enter 10-digit mobile no."
                      onChange={event => this.handleChange("phone", event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="description"> Message</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Enter Your Message"
                      onChange={event => this.handleChange("message", event)}
                    />
                  </div>
                  <div>
                    <button
                      // onClick={this.togglePopup.bind(this)}
                      type="submit"
                      value="Send"
                      className="btn btn-default submit"
                    >
                      <i className="fa fa-paper-plane" aria-hidden="true" />{" "}
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="contact-section">
          <div className="popup-container">
            {this.state.showPopup ? (
              <Popup
                className="popup-element"
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
