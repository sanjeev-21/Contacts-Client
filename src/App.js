import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import AddContact from "./AddContact";
import Contacts from "./Contacts";

function App() {
  const apiUrl = "http://localhost:8081";
  const [ items, setItems ] = useState();
  const [ contact, setContact] = useState();    

  useEffect(()=>{
    getContacts();
  },[]);

  const getContacts = () => {
    console.log('call get')
    axios.get(`${apiUrl}/contact/getContact`).then(res => {
        setItems(res.data);
    })
  }
  const searchContact = (value) => {
    axios.get(`${apiUrl}/contact/getOneContactName/${value}`).then(res => {
      setItems(res.data);
  })
  }
  const editContact = (item) => {
    axios.get(`${apiUrl}/contact/getOneContact/${item._id}`).then(res => {
        setContact(res.data);
    })
    console.log('item',item)
}
   return (
     <div className="App">
      <AddContact  getContacts={getContacts} editContact={contact}/>
      <Contacts getContacts={getContacts} contacts={items} editContact={editContact} searchContact={searchContact}/>
     </div>
   );
  }
export default App;
