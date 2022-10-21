import "./App.css";
import React, { Component } from "react";
import { nanoid } from "nanoid";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filterInputValue: "",
  };
  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    const contacts = this.state.contacts;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  componentDidUpdate() {
    const contacts = this.state.contacts;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  componentWillUnmount(key) {
    this.deleteContact(key);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;
    console.log(name, number);
    const contact = { id: nanoid(), name: name, number: number };
    const foundContant = this.state.contacts.find(
      (contact) => contact.name === name
    );
    const alertMessage = name + "is already in contacts.";
    if (foundContant) {
      return alert(alertMessage);
    } else {
      this.setState((oldState) => ({
        ...oldState,
        contacts: [...oldState.contacts, contact],
      }));
    }

    e.currentTarget.reset();
  };
  handleChange = (evt) => {
    this.setState({ filterInputValue: evt.target.value });
  };
  deleteContact = (key) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== key),
    }));
  };
  render() {
    return (
      <div>
        <ContactForm handleSubmit={this.handleSubmit} />
        <ContactList
          contactList={this.state.contacts}
          filterInputValue={this.state.filterInputValue}
          onClick={this.deleteContact}
        />
        <Filter
          handleChange={this.handleChange}
          filterInputValue={this.state.filterInputValue}
        />
      </div>
    );
  }
}
export default App;
