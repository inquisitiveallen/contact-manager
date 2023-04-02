import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { v4 as uuid } from 'uuid';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'

function App() {
  const [contacts, setContacts] = useState([])

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    console.log('heilwi')
    console.log(newContactList)
    setContacts(newContactList)
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem("contacts"));
    if (retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Route path='/add' />
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactID={removeContactHandler} />
      </Router>
    </div>
  );
}

export default App;
